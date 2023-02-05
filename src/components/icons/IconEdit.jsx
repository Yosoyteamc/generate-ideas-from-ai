import React from 'react';

const IconEdit = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      d="M16.575 4.5 6.313 15.363c-.388.412-.763 1.224-.838 1.787l-.462 4.05c-.163 1.463.887 2.463 2.337 2.213l4.025-.688c.563-.1 1.35-.513 1.738-.938l10.262-10.862C25.15 9.05 25.95 6.912 23.187 4.3c-2.75-2.587-4.837-1.675-6.612.2Z"
      stroke={props.color || "#000"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.863 6.313a7.658 7.658 0 0 0 6.812 6.437M3.75 27.5h22.5"
      stroke={props.color || "#000"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default IconEdit;
