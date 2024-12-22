import PreviewMap from "../../components/Home/PreviewMap";
import Settings from "../../components/Home/Settings";
import UpdatingMap from "../../components/Home/UpdatingMap";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <main style={{ display: "flex", alignContent: "center" }}>
      <Settings />
      <div className={styles.mapsContainer}>
        {/* <HereMaps center={{ lat: 50, lng: 5 }} zoom={2} isPreview={true} /> */}
        <PreviewMap />
        <UpdatingMap />
        {/* <HereMaps center={{ lat: 50, lng: 5 }} zoom={2} /> */}
      </div>
    </main>
  );
};

export default Home;
