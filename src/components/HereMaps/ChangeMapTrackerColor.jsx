import ColorPicker from "../colorPicker/ColorPicker";
import useMapControl from "../../store/useMapControl";
import styles from "./styles.module.css";

const ChangeMapTrackerColor = ({ setNeedSave }) => {
  const trackColor = useMapControl((state) => state.trackColor);
  const setTrackColor = useMapControl((state) => state.setTrackColor);

  const handleChangeTrackColor = (color) => {
    setTrackColor(color);
    setNeedSave(true);
  };

  return (
    <div className={styles.inputContainer}>
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
