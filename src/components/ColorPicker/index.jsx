import { useEffect, useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import styles from "./styles.module.css";
extend([namesPlugin]);

const ColorPicker = ({ inputID, color, callBack }) => {
  const [colorPicked, setColorPicked] = useState(color || "red");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPicker = useRef(null);

  const rgbaString = colorPicked.startsWith("rgba")
    ? colorPicked
    : colord(colorPicked).toRgbString();

  const [isError, setIsError] = useState({ error: false, message: "" });
  const colorRegex =
    /^(#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})|rgb\((\s*\d+\s*,\s*){2}\d+\s*\)|rgba\((\s*\d+\s*,\s*){3}(0|0?\.\d+|1)\s*\)|hsl\(\s*\d+\s*,\s*(\d+%?\s*,\s*){2}\)|hsla\(\s*\d+\s*,\s*\d+%?,\s*\d+%?,\s*(0|0?\.\d+|1)\s*\)|[a-zA-Z]+)$/;

  console.log("isError.error", isError.error);

  const handleColorPicked = ({ color }) => {
    // console.log("value: ", color);
    console.log("color", color);
    if (!colorRegex.test(color)) {
      setIsError({
        error: true,
        message: "Please insert a correct color",
      });
    }
    // else
    //   setIsError({
    //     error: false,
    //     message: "",
    //   });

    setColorPicked(color);
    callBack(color);
  };

  useEffect(() => {
    const handleCloseColorPicker = (e) => {
      if (
        e.target !== colorPicker.current &&
        !colorPicker.current.contains(e.target)
      )
        setShowColorPicker(false);
    };
    if (!showColorPicker)
      return window.removeEventListener("click", handleCloseColorPicker);

    window.addEventListener("click", handleCloseColorPicker);

    return () => window.removeEventListener("click", handleCloseColorPicker);
  }, [showColorPicker]);

  return (
    <div ref={colorPicker} className={styles.colorPickerContainer}>
      {showColorPicker && (
        <div className={styles.colorPicker}>
          <RgbaStringColorPicker
            color={rgbaString}
            onChange={(color) => handleColorPicked({ color })}
          />
        </div>
      )}
      <div>
        <div className={styles.inputContainer}>
          <input
            id={inputID}
            className={styles.colorInput}
            type="text"
            value={colorPicked}
            onChange={(e) => handleColorPicked({ color: e.target.value })}
          />
          <div
            className={styles.colorTriggers}
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <span style={{ background: rgbaString }}></span>
          </div>
        </div>
        {isError.error ? <p className={styles.error}>{isError.message}</p> : ""}
      </div>
    </div>
  );
};

export default ColorPicker;
