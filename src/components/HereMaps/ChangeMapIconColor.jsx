import useMapControl from "../../store/useMapControl";
import ColorPicker from "../colorPicker/ColorPicker";
import styles from "./styles.module.css";

const ChangeMapIconColor = ({ setNeedSave }) => {
  const brandColor = useMapControl((state) => state.brandColor);
  const setBrandColor = useMapControl((state) => state.setBrandColor);
  const handleChangeIconColor = (color) => {
    setBrandColor(color);
    setNeedSave(true);
  };
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="icon-color" className={styles.label}>
        Change Icon Color
      </label>
      <ColorPicker
        inputID="icon-color"
        callBack={handleChangeIconColor}
        color={brandColor}
      />
    </div>
  );
};

export default ChangeMapIconColor;
