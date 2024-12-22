import ColorPicker from "../ColorPicker";
import useMapControl from "../../store/useMapControl";
import styles from "./styles.module.css";

const ChangeMapTrackerColor = () => {
  // const brandColor = useMapControl((state) => state.brandColor);
  // const setBrandColor = useMapControl((state) => state.setBrandColor);
  const trackColor = useMapControl((state) => state.trackColor);
  const setTrackColor = useMapControl((state) => state.setTrackColor);

  const handleChangeTrackColor = (color) => setTrackColor(color);

  return (
    <div
      className={styles.trackColorChanger}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <label htmlFor="tracker-color" className={styles.label}>
        Change Tracker Color
      </label>
      <ColorPicker
        inputID="tracker-color"
        callBack={handleChangeTrackColor}
        color={trackColor}
      />
    </div>
  );
};

export default ChangeMapTrackerColor;
