import * as React from "react"

const IconMenu = (props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M25.58 12.119a3.588 3.588 0 1 0 0-7.175 3.588 3.588 0 0 0 0 7.175Zm-16.16 0a3.588 3.588 0 1 0 0-7.175 3.588 3.588 0 0 0 0 7.175Zm16.16 17.937a3.587 3.587 0 1 0 0-7.174 3.587 3.587 0 0 0 0 7.174Zm-16.16 0a3.588 3.588 0 1 0 0-7.175 3.588 3.588 0 0 0 0 7.175Z"
      stroke= {props.color ? props.color : "#A1A8BE"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default IconMenu
