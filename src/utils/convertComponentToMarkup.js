import ReactDOMServer from "react-dom/server";

const convertComponentToMarkup = ({ Component }) => {
  return ReactDOMServer.renderToStaticMarkup(Component);
};

export default convertComponentToMarkup;
