import HereMaps from "../hereMaps/HereMaps";

const LiveMap = () => {
  return <HereMaps center={{ lat: 50, lng: 5 }} zoom={2} isPreview={false} />;
};

export default LiveMap;
