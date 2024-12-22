import useMapControl from "../../store/useMapControl";
import ColorPicker from "../ColorPicker";
import styles from "./styles.module.css";

const ChangeMapIconColor = () => {
  const brandColor = useMapControl((state) => state.brandColor);
  const setBrandColor = useMapControl((state) => state.setBrandColor);
  const handleChangeIconColor = (color) => setBrandColor(color);
  return (
    <div
      className={styles.trackColorChanger}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
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
