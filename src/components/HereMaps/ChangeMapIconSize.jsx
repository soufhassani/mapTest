import useMapControl from "../../store/useMapControl";
import styles from "./styles.module.css";

const ChangeMapIconSize = ({ setNeedSave }) => {
  const iconSize = useMapControl((state) => state.iconSize);
  const setIconSize = useMapControl((state) => state.setIconSize);

  const handleChangeSize = (e) => {
    const value = e.target.value;

    if (value < 0 || value > 100) return;
    setIconSize(value);
    setNeedSave(true);
  };
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="icon-size" className={styles.label}>
        Change Icon Size
      </label>
      <input
        id="icon-size"
        type="range"
        max="100"
        min="0"
        value={iconSize}
        onChange={handleChangeSize}
      />
    </div>
  );
};

export default ChangeMapIconSize;
