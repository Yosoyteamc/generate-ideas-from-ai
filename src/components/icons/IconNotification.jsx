import React from 'react';

const IconNotification = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 35 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.53 5.24c-4.828 0-8.75 3.923-8.75 8.75v4.214c0 .89-.38 2.246-.832 3.005L6.27 23.994c-1.036 1.72-.321 3.631 1.575 4.273a30.51 30.51 0 0 0 19.352 0c1.764-.584 2.537-2.669 1.575-4.273l-1.677-2.785c-.438-.759-.817-2.115-.817-3.005V13.99c0-4.813-3.937-8.75-8.75-8.75Z"
      stroke={props.color? props.color : "#8E8E8E"}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <path
      d="M20.227 5.663a9.85 9.85 0 0 0-5.396 0 2.895 2.895 0 0 1 2.698-1.838c1.225 0 2.275.759 2.698 1.838Z"
      stroke={props.color? props.color : "#8E8E8E"}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.904 28.792a4.388 4.388 0 0 1-4.375 4.375 4.39 4.39 0 0 1-3.091-1.284 4.39 4.39 0 0 1-1.284-3.091"
      stroke={props.color? props.color : "#8E8E8E"}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </svg>
)

export default IconNotification;
