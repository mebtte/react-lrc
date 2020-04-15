import React, { useRef, useCallback } from 'react';
import { Lrc, LrcLine } from '@mebtte/react-lrc';

const style = {
  wrapper: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  lrc: {
    flex: 1,
    padding: 20,
  },
  line: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
};

const Wrapper = ({ music, currentTime }) => {
  const lrcRef = useRef();
  const scrollToCurrentLine = useCallback(
    () => lrcRef.current.scrollToCurrentLine(),
    [],
  );

  return (
    <div style={style.wrapper}>
      <div className="actions">
        <button type="button" onClick={scrollToCurrentLine}>
          scroll to current line
        </button>
      </div>
      <Lrc
        lrc={music.lrc}
        currentTime={currentTime * 1000}
        style={style.lrc}
        ref={lrcRef}
      >
        {(line, active) => (
          <LrcLine
            key={line.millisecond}
            style={{
              ...style.line,
              color: active ? 'red' : 'gray',
            }}
          >
            {line.content}
          </LrcLine>
        )}
      </Lrc>
    </div>
  );
};

export default Wrapper;
