import React from 'react';

const IconRemove  = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      d="M26.25 7.475c-4.163-.412-8.35-.625-12.525-.625-2.475 0-4.95.125-7.425.375l-2.55.25m6.875-1.262.275-1.638c.2-1.188.35-2.075 2.463-2.075h3.274c2.113 0 2.276.938 2.463 2.088l.275 1.625m4.188 5.212-.813 12.587c-.137 1.963-.25 3.488-3.738 3.488h-8.024c-3.488 0-3.6-1.525-3.738-3.488l-.813-12.587m6.475 9.2h4.163m-5.2-5h6.25"
      stroke={props.color || '#000'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default IconRemove;
