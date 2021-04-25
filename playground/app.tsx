import React from 'react';
import styled from 'styled-components';

import Time from './time';
import LrcDisplay from './lrc_display';

const Scollbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const Style = styled.div`
  width: 100%;
  height: 100%;
  min-width: 720px;
  min-height: 540px;
  display: flex;
  > .operation {
    flex: 1;
    min-width: 0;
  }
`;

const App = () => {
  return (
    <Scollbar>
      <Style>
        <div className="operation">
          <Time />
        </div>
        <LrcDisplay />
      </Style>
    </Scollbar>
  );
};

export default App;
