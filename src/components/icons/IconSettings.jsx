import React from 'react';

const IconSettings = (props) => (
    <svg
      width={16}
      height={16}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 21.875a4.375 4.375 0 1 0 0-8.75 4.375 4.375 0 0 0 0 8.75Z"
        stroke={props.color ? props.color : "#A1A8BE"}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.917 18.783v-2.566c0-1.517 1.24-2.771 2.77-2.771 2.64 0 3.72-1.867 2.392-4.156A2.77 2.77 0 0 1 9.1 5.513l2.523-1.444c1.152-.686 2.64-.277 3.325.875l.16.277c1.313 2.29 3.471 2.29 4.798 0l.16-.277c.686-1.152 2.174-1.56 3.326-.875l2.523 1.444a2.77 2.77 0 0 1 1.02 3.777c-1.327 2.29-.247 4.156 2.392 4.156 1.517 0 2.77 1.24 2.77 2.77v2.567c0 1.517-1.239 2.771-2.77 2.771-2.64 0-3.719 1.867-2.392 4.156a2.766 2.766 0 0 1-1.02 3.777l-2.523 1.444c-1.152.686-2.64.277-3.325-.875l-.16-.277c-1.313-2.29-3.472-2.29-4.799 0l-.16.277c-.686 1.152-2.173 1.56-3.325.875L9.1 29.487a2.77 2.77 0 0 1-1.02-3.777c1.326-2.29.247-4.156-2.392-4.156a2.779 2.779 0 0 1-2.771-2.77Z"
        stroke={props.color ? props.color : "#A1A8BE"}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export default IconSettings;
