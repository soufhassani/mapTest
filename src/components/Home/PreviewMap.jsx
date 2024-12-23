import HereMaps from "../hereMaps/HereMaps";

const PreviewMap = () => {
  return <HereMaps center={{ lat: 50, lng: 5 }} zoom={2} isPreview={true} />;
};

export default PreviewMap;
