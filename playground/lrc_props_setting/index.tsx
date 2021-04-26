import React from 'react';
import styled from 'styled-components';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import eventemitter, { EventType } from '../eventemtiter';
import { INITIAL_LRC_PROPS } from '../data';

const Style = styled.div`
  flex: 1;
  min-height: 0;
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
    <Style>
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
