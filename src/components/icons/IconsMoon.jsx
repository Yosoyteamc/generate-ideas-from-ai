import React from 'react';

const IconsMoon = (props) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.115 12.938c.375 5.364 4.927 9.729 10.375 9.968 3.843.167 7.28-1.625 9.343-4.448.855-1.156.396-1.927-1.03-1.666a9.893 9.893 0 0 1-2.168.145c-5.093-.208-9.26-4.468-9.28-9.5a9.267 9.267 0 0 1 .78-3.802c.563-1.291-.114-1.906-1.416-1.354-4.125 1.74-6.948 5.896-6.604 10.656Z"
        stroke={props.color? props.color: "#A1A8BE"}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
  

export default IconsMoon;
