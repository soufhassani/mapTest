const addPintoIcon = ({ svgIcon }) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="70" viewBox="0 0 50 70">
      <path d="M25,0 C35,0 40,10 40,20 C40,30 25,50 25,50 C25,50 10,30 10,20 C10,10 15,0 25,0 Z" fill="#FF0000"/>
      <g transform="translate(12, 20)">
        <image x="12" y="20" width="25" height="25" href="data:image/svg+xml;utf8,${encodeURIComponent(
          svgIcon
        )}" />
      </g>
    </svg>
  `;
};

export default addPintoIcon;
