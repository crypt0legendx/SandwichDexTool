import React, { useEffect, useRef, useState } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const TradingChart = (props) => {
  const tradingRef = useRef(null);
  const [symbol, setSymbol] = useState("BTCUSDT");

  useEffect(() => {

    setSymbol(props.symbol);
  }, [props.symbol]);

  return (
    <div style={{width:'100%'}} >
    <TradingViewWidget
      width="100%"
      height={500}
      symbol={symbol}
      theme={Themes.LIGHT}
      locale="en"
      interval={props.interval}
      timezone="exchange"
      hide_top_toolbar={true}
      ref={tradingRef}
    />
    </div>
  );
};
export default TradingChart;
