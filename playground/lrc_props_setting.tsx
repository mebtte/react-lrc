import React from 'react';
import styled from 'styled-components';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import eventemitter, { EventType } from './eventemtiter';
import { INITIAL_LRC_PROPS } from './data';

const Style = styled(Paper)`
  flex: 1;
  min-height: 0;
  margin: 10px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LrcPropsSetting = () => {
  const onAutoScrollChange = (_, checked: boolean) =>
    eventemitter.emit(EventType.LRC_PROPS_CHANGED, {
      key: 'autoScroll',
      value: checked,
    });
  const onTopBlankChange = (_, checked: boolean) =>
    eventemitter.emit(EventType.LRC_PROPS_CHANGED, {
      key: 'topBlank',
      value: checked,
    });
  const onBottomBlankChange = (_, checked: boolean) =>
    eventemitter.emit(EventType.LRC_PROPS_CHANGED, {
      key: 'bottomBlank',
      value: checked,
    });
  return (
    <Style elevation={3}>
      <FormGroup row={false}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={onAutoScrollChange}
              defaultChecked={INITIAL_LRC_PROPS.autoScroll}
            />
          }
          label="autoScroll"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={onTopBlankChange}
              defaultChecked={INITIAL_LRC_PROPS.topBlank}
            />
          }
          label="topBlank"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={onBottomBlankChange}
              defaultChecked={INITIAL_LRC_PROPS.bottomBlank}
            />
          }
          label="bottomBlank"
        />
      </FormGroup>
    </Style>
  );
};

export default LrcPropsSetting;
