import PreviewMap from "../../components/Home/PreviewMap";
import Settings from "../../components/Home/Settings";
import LiveMap from "../../components/Home/LiveMap";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <Settings />
      <div className={styles.mapsContainer}>
        <PreviewMap />
        <LiveMap />
      </div>
    </main>
  );
};

export default Home;
