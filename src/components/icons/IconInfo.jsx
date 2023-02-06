import React from 'react';

const IconInfo = (props) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 11.667v7.291m0 13.125c8.02 0 14.583-6.562 14.583-14.583 0-8.02-6.562-14.583-14.583-14.583-8.02 0-14.583 6.562-14.583 14.583 0 8.02 6.562 14.583 14.583 14.583ZM17.493 23.333h.009"
        stroke={props.color ? props.color : "#A1A8BE"}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export default IconInfo;
