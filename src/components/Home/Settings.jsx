import { toast, ToastContainer } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi";
import ChangeMapTrackerColor from "../hereMaps/ChangeMapTrackerColor";
import ChangeMapTrackerThickness from "../hereMaps/ChangeMapTrackerThickness";
import useMapControl from "../../store/useMapControl";
import ChangeMapIconColor from "../hereMaps/ChangeMapIconColor";
import ChangeMapIconSize from "../hereMaps/ChangeMapIconSize";
import styles from "./styles.module.css";
import useAPICall from "../../hooks/useAPICall";
import { useState } from "react";

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

  const [needSave, setNeedSave] = useState(false);

  const { simulateAPICall, isLoading } = useAPICall();

  const handleSave = async () => {
    try {
      await simulateAPICall();
      setStartUpdating(true);
      setUpdatedIconSize(iconSize);
      setUpdatedBrandColor(brandColor);
      setUpdatedTrackColor(trackColor);
      setUpdatedTrackThickness(trackThickness);
      toast.success("Your live cart was updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setNeedSave(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsControl}>
        <div className={styles.controller}>
          <h2 className={styles.h2}>Icon Controller</h2>
          <ChangeMapIconColor setNeedSave={setNeedSave} />
          <ChangeMapIconSize setNeedSave={setNeedSave} />
        </div>
        <div className={styles.controller}>
          <h2 className={styles.h2}>Tracker Controller</h2>
          <ChangeMapTrackerColor setNeedSave={setNeedSave} />
          <ChangeMapTrackerThickness setNeedSave={setNeedSave} />
        </div>
      </div>
      {/* didn't use form in here because there is need as long as i'm using controlled inputs */}
      <button
        className={isLoading || !needSave ? styles.ctaLoading : styles.cta}
        disabled={isLoading || !needSave}
        onClick={handleSave}
      >
        {isLoading ? (
          <span>
            <BiLoaderAlt className={styles.loader} /> Loading
          </span>
        ) : (
          "Save"
        )}
      </button>
      <ToastContainer />
    </div>
  );
};

export default Settings;
