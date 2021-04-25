import React from 'react';
import styled, { css } from 'styled-components';

const Style = styled.div<{
  active: boolean;
}>`
  padding: 10px 20px;
  font-size: 24px;
  ${({ active }) => css`
    color: ${active ? 'lightgreen' : '#555'};
  `}
`;

const LyricLine = ({
  active,
  content,
}: {
  active: boolean;
  content: string;
}) => <Style active={active}>{content}</Style>;

export default LyricLine;
