import React from 'react';

const IconMenuHamburger = (props) => (
    <svg
      width={16}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1h18M1 6h18M1 11h18"
        stroke={props.color ? props.color : "#8E8E8E"}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
)
  

export default IconMenuHamburger;
