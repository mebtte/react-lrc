import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  > .action {
    margin-left: 10px;
  }
`;

const CustomInput = ({ onSet }: { onSet: (m: number) => void }) => {
  const [millisecond, setMillisecond] = useState('');
  const onMillisecondChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMillisecond(event.target.value);

  return (
    <Style>
      <TextField
        type="number"
        value={millisecond}
        onChange={onMillisecondChange}
        placeholder="Custom Millisecond"
      />
      <Button
        className="action"
        variant="contained"
        color="primary"
        onClick={() => onSet(+millisecond || 0)}
      >
        set
      </Button>
    </Style>
  );
};

export default React.memo(CustomInput);
