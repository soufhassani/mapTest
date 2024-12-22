import useMapControl from "../../store/useMapControl";
import styles from "./styles.module.css";

const ChangeMapTrackerThickness = () => {
  const trackThickness = useMapControl((state) => state.trackThickness);
  const setTrackThickness = useMapControl((state) => state.setTrackThickness);

  const handleChangeThickness = (e) => {
    const value = e.target.value;

    if (value < 0 || value > 10) return;

    setTrackThickness(value);
  };
  return (
    <div className={styles.trackColorChanger}>
      <label htmlFor="tracker-thickness" className={styles.label}>
        Change Tracker Thickness
      </label>
      <input
        type="range"
        max="10"
        min="0"
        value={trackThickness}
        onChange={handleChangeThickness}
      />
    </div>
  );
};

export default ChangeMapTrackerThickness;
