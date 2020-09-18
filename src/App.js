import React, { useState, useEffect } from "react";
import "./styles.css";

let load = 0;

export default function App() {
  const [loadText, setLoadText] = useState("0%");
  const [opacityStyle, setOpacity] = useState(1);
  const [filterStyle, setFilter] = useState("0px");
  const [loadValue, setLoadValue] = useState(0);

  // from https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  useEffect(() => {
    let interval = setInterval(blurring, 30);
    let timeout;

    function blurring() {
      let newLoad = loadValue + 1;

      if (newLoad > 99) {
        clearInterval(interval);
        // recreate the interval after 2 sec
        timeout = setTimeout(() => {
          load = 0;
          setLoadValue(0);
          interval = setInterval(blurring, 30);
        }, 2000);
      } else {
        load = newLoad;
        setLoadValue(newLoad);
        setLoadText(load + "%");
        setOpacity(scale(load, 0, 100, 1, 0));
        setFilter(scale(load, 0, 100, 30, 0) + "px");
      }
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  });

  return (
    <div className="app">
      <section
        className="bg"
        style={{
          filter: `blur(${filterStyle})`
        }}
      ></section>
      <div
        className="loading-text"
        style={{
          opacity: opacityStyle
        }}
      >
        {loadText}
      </div>
    </div>
  );
}
