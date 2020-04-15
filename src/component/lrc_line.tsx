import React from 'react';

import { LRC_LINE_CLASS_NAME } from '../constant';

const LrcLine = ({
  className = '',
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div {...props} className={`${LRC_LINE_CLASS_NAME} ${className}`}>
      {props.children}
    </div>
  );
};

export default LrcLine;
