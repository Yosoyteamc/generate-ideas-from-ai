import React from 'react';

const IconSearch = (props) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m21.23 21.23-1.922-1.922m-8.173.961a9.134 9.134 0 1 0 0-18.268 9.134 9.134 0 0 0 0 18.268Z"
        stroke={props.color ? props.color : "#8E8E8E"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
  

export default IconSearch;
