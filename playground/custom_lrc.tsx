import React from 'react';
import { TextField } from '@material-ui/core';
import { debounce } from 'lodash';

import { LRC } from './data';
import eventemitter, { EventType } from './eventemtiter';

const style = {
  margin: 10,
  flex: 1,
  minHeight: 0,
};
const emitChange = debounce(
  (lrc: string) => eventemitter.emit(EventType.LRC_CHANGE, lrc),
  500,
);
const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  emitChange(event.target.value);

const CustomLrc = () => (
  <TextField
    label="Custom Lrc"
    multiline
    rows="10"
    defaultValue={LRC}
    onChange={onChange}
    variant="outlined"
    style={style}
  />
);

export default React.memo(CustomLrc);
