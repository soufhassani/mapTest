import ChangeMapTrackerColor from "../HereMaps/ChangeMapTrackerColor";
import ChangeMapTrackerThickness from "../HereMaps/ChangeMapTrackerThickness";
import useMapControl from "../../store/useMapControl";
import ChangeMapIconColor from "../HereMaps/ChangeMapIconColor";
import ChangeMapIconSize from "../HereMaps/ChangeMapIconSize";

const Settings = () => {
  const iconSize = useMapControl((state) => state.iconSize);
  const brandColor = useMapControl((state) => state.brandColor);
  const trackThickness = useMapControl((state) => state.trackThickness);
  const trackColor = useMapControl((state) => state.trackColor);

  const setUpdatedBrandColor = useMapControl(
    (state) => state.setUpdatedBrandColor
  );
  const setUpdatedTrackColor = useMapControl(
    (state) => state.setUpdatedTrackColor
  );
  const setUpdatedIconSize = useMapControl((state) => state.setUpdatedIconSize);
  const setUpdatedTrackThickness = useMapControl(
    (state) => state.setUpdatedTrackThickness
  );
  const setStartUpdating = useMapControl((state) => state.setStartUpdating);

  const handleSave = () => {
    setStartUpdating(true);
    setUpdatedIconSize(iconSize);
    setUpdatedBrandColor(brandColor);
    setUpdatedTrackColor(trackColor);
    setUpdatedTrackThickness(trackThickness);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "50px",
      }}
    >
      <ChangeMapIconColor />
      <ChangeMapIconSize />
      <ChangeMapTrackerColor />
      <ChangeMapTrackerThickness />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;
