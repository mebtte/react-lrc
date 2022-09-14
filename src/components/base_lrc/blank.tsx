import React, { CSSProperties, memo } from 'react';

const style: CSSProperties = {
  height: '50%',
};

function Blank() {
  return <div style={style} />;
}

export default memo(Blank);
