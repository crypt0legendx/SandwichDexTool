import React, { useEffect, useRef, useState } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const TradingChart = (props) => {
  const tradingRef = useRef(null);
  const [symbol, setSymbol] = useState("BTCUSDT");

  useEffect(() => {
    console.log(tradingRef.current.props.symbol);
    setSymbol(props.symbol);
  }, []);

  console.log(symbol);

  return (
    <TradingViewWidget
      width={'100%'}
      symbol={symbol}
      theme={Themes.LIGHT}
      locale="en"
      interval="D"
      timezone="exchange"
      theme="Light"
      hide_top_toolbar={true}
      ref={tradingRef}
    />
  );
};
export default TradingChart;