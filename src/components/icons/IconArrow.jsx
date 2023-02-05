import React from 'react';

const IconArrow = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        d="M14.43 5.93 20.5 12l-6.07 6.07M3.5 12h16.83"
        stroke={props.color || "#000"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export default IconArrow;
