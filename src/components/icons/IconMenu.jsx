import * as React from "react"

const IconMenu  = (props) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 8.75h22.5M5 15h15.625M5 21.25h8.75"
      stroke={props.color || "#fff"}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
)

export default IconMenu
