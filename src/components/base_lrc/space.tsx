import { type CSSProperties, memo } from 'react';

const style: CSSProperties = {
  height: '50%',
};

function Space() {
  return <div style={style} />;
}

export default memo(Space);
