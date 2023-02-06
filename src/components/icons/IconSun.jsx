import React from 'react';


const IconSun = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#a)"
      stroke={props.color? props.color: "#A1A8BE"}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.5 19.27a6.77 6.77 0 1 0 0-13.54 6.77 6.77 0 0 0 0 13.54ZM19.938 19.938l-.136-.136m0-14.604.136-.136M5.062 19.938l.136-.135M12.5 2.167v-.084m0 20.834v-.084M2.167 12.5h-.084m20.834 0h-.084M5.198 5.198l-.136-.136" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default IconSun;
