import React from 'react';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash/debounce';

import { LRC } from './data';
import eventemitter, { EventType } from './eventemitter';

const style = {
  margin: 10,
};
const emitChange = debounce(
  (lrc: string) => eventemitter.trigger(EventType.LRC_CHANGE, lrc),
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
