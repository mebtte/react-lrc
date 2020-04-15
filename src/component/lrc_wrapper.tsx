import React, { PureComponent } from 'react';

import { LrcProps } from '../type';

import Lrc from './lrc';

class LrcWrapper extends PureComponent<
  LrcProps,
  {
    scrollToCurrentLineSymbol: number;
  }
> {
  state = {
    scrollToCurrentLineSymbol: 0,
  };

  scrollToCurrentLine() {
    this.setState({ scrollToCurrentLineSymbol: Math.random() });
  }

  render() {
    const { scrollToCurrentLineSymbol } = this.state;
    return (
      <Lrc
        {...this.props}
        scrollToCurrentLineSymbol={scrollToCurrentLineSymbol}
      />
    );
  }
}

export default LrcWrapper;
