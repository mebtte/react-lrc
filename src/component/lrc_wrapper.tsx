import React, { PureComponent } from 'react';

import { LrcProps, LrcLine } from '../type';
import { ININIAL_LRC_LINE_INDEX } from '../constant';

import Lrc from './lrc';

class LrcWrapper extends PureComponent<
  LrcProps,
  {
    scrollToCurrentLineSymbol: number;
    currentLrcLine: LrcLine | null;
    currentLrcLineIndex: number;
  }
> {
  constructor(props: LrcProps) {
    super(props);
    this.state = {
      scrollToCurrentLineSymbol: 0,
      currentLrcLine: null,
      currentLrcLineIndex: ININIAL_LRC_LINE_INDEX,
    };
    this.onCurrentLineChange = this.onCurrentLineChange.bind(this);
  }

  scrollToCurrentLine() {
    this.setState({ scrollToCurrentLineSymbol: Math.random() });
  }

  getCurrentLine(): {
    lrcLine: LrcLine | null;
    index: number;
  } {
    const { currentLrcLine, currentLrcLineIndex } = this.state;
    return {
      lrcLine: currentLrcLine,
      index: currentLrcLineIndex,
    };
  }

  private onCurrentLineChange(lrcLine: LrcLine, index: number) {
    const { onCurrentLineChange } = this.props;
    this.setState(
      {
        currentLrcLine: lrcLine,
        currentLrcLineIndex: index,
      },
      () => {
        if (onCurrentLineChange) {
          onCurrentLineChange(lrcLine, index);
        }
      },
    );
  }

  render() {
    const { scrollToCurrentLineSymbol } = this.state;
    return (
      <Lrc
        {...this.props}
        onCurrentLineChange={this.onCurrentLineChange}
        scrollToCurrentLineSymbol={scrollToCurrentLineSymbol}
      />
    );
  }
}

export default LrcWrapper;
