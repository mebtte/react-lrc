import styled from 'styled-components';

export const StyledApp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  > .top {
    display: flex;
    padding: 10px 0;
  }
`;

export const MusicList = styled.div`
  flex: 1;
`;

export const Action = styled.div`
  flex: 1;
`;
