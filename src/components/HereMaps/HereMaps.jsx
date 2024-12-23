import { useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import convertComponentToMarkup from "../../utils/convertComponentToMarkup";
import useMapControl from "../../store/useMapControl";
import styles from "./styles.module.css";

const HereMaps = ({ isPreview = false }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerARef = useRef(null);
  const markerBRef = useRef(null);
  const polylineRef = useRef(null);

  const iconSize = useMapControl((state) => state.iconSize);
  const brandColor = useMapControl((state) => state.brandColor);
  const trackThickness = useMapControl((state) => state.trackThickness);
  const trackColor = useMapControl((state) => state.trackColor);

  const updatedIconSize = useMapControl((state) => state.updatedIconSize);
  const updatedBrandColor = useMapControl((state) => state.updatedBrandColor);
  const updatedTrackThickness = useMapControl(
    (state) => state.updatedTrackThickness
  );
  const updatedTrackColor = useMapControl((state) => state.updatedTrackColor);
  const startUpdating = useMapControl((state) => state.startUpdating);
  const setStartUpdating = useMapControl((state) => state.setStartUpdating);

  const pointA = { lat: 52.52, lng: 13.405 };
  const pointB = { lat: 52.515, lng: 13.402 };

  useEffect(() => {
    const platform = new H.service.Platform({
      apikey: import.meta.env.VITE_HERE_MAP_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      mapContainerRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 52.52, lng: 13.405 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    mapRef.current = map;

    // Add interaction and controls
    const handleResizeMap = () => map.getViewPort().resize();

    // handle Resize as said in the documentation
    window.addEventListener("resize", handleResizeMap);

    // Cleanup the map on component unmount
    return () => {
      map.dispose();
      window.removeEventListener("resize", handleResizeMap);
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Create icons by converting the component to HTML markup by the help of the function i've created
    const shippingSVGIcon = convertComponentToMarkup({
      Component: (
        <MdDeliveryDining color={isPreview ? brandColor : updatedBrandColor} />
      ),
    });

    const userSVGIcon = convertComponentToMarkup({
      Component: (
        <FaUserCircle color={isPreview ? brandColor : updatedBrandColor} />
      ),
    });

    // Create markers
    const shippingIcon = new H.map.Icon(shippingSVGIcon, {
      size: isPreview
        ? { w: iconSize, h: iconSize }
        : { w: updatedIconSize, h: updatedIconSize },
      anchor: { x: 10, y: 10 },
    });

    const userIcon = new H.map.Icon(userSVGIcon, {
      size: isPreview
        ? { w: iconSize, h: iconSize }
        : { w: updatedIconSize, h: updatedIconSize },
      anchor: { x: 10, y: 0 },
    });

    const markerA = new H.map.Marker(pointA, { icon: shippingIcon });
    const markerB = new H.map.Marker(pointB, { icon: userIcon });

    map.addObject(markerA);
    map.addObject(markerB);

    markerARef.current = markerA;
    markerBRef.current = markerB;

    // Create polyline as showed in the documentation, to be honest i tried to use route calculator as showed in the documentation but i get 403 response i think because it's not supported for freemium accounts
    const lineString = new H.geo.LineString();
    lineString.pushLatLngAlt(pointA.lat, pointA.lng);
    lineString.pushLatLngAlt(pointB.lat, pointB.lng);

    const polyline = new H.map.Polyline(lineString, {
      style: {
        strokeColor: isPreview ? trackColor : updatedTrackColor,
        lineWidth: isPreview ? trackThickness : updatedTrackThickness,
        lineJoin: "round",
      },
    });

    map.addObject(polyline);
    polylineRef.current = polyline;

    map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox(),
    });

    // this line was added because i faced an issue that I still don't know why, that the initiation of the map instance with the zoom in the config isn't working, so i had to wait until the map is rendered then set the zoom manually
    map.setZoom(15);
  }, []);

  // Updating part, this part will be taking care of the updating whether for live cart or the preview one.
  // First useEffect will be responsible for updating Icons.
  // Second useEffect will be responsible for updating TheTrack.
  useEffect(() => {
    if (!markerARef.current && !markerBRef.current) return;

    if (!isPreview && !startUpdating)
      return; // stop live cart from being updated.
    else setStartUpdating(false); // after jumping the condition the startUpdate must be false so the next edit will not impact the live cart.

    const shippingSVGIcon = convertComponentToMarkup({
      Component: (
        <MdDeliveryDining color={isPreview ? brandColor : updatedBrandColor} />
      ),
    });
    const userSVGIcon = convertComponentToMarkup({
      Component: (
        <FaUserCircle color={isPreview ? brandColor : updatedBrandColor} />
      ),
    });

    markerARef.current.setIcon(
      new H.map.Icon(shippingSVGIcon, {
        size: isPreview
          ? { w: iconSize, h: iconSize }
          : { w: updatedIconSize, h: updatedIconSize },
        anchor: { x: 10, y: 15 },
      })
    );
    markerBRef.current.setIcon(
      new H.map.Icon(userSVGIcon, {
        size: isPreview
          ? { w: iconSize, h: iconSize }
          : { w: updatedIconSize, h: updatedIconSize },
        anchor: { x: 15, y: 0 },
      })
    );
  }, [iconSize, updatedIconSize, brandColor, updatedBrandColor]);

  useEffect(() => {
    if (polylineRef.current) {
      polylineRef.current.setStyle({
        strokeColor: isPreview ? trackColor : updatedTrackColor,
        lineWidth: isPreview ? trackThickness : updatedTrackThickness,
        lineJoin: "round",
      });
    }
  }, [trackThickness, trackColor, updatedTrackThickness, updatedTrackColor]);

  return <div ref={mapContainerRef} className={styles.canvasMap}></div>;
};

export default HereMaps;
