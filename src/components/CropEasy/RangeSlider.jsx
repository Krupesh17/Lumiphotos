import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RangeSlider = ({
  name,
  min = 0,
  max = 100,
  defaultValue = 0,
  step = 0.5,
  marks = {},
  value,
  onChange,
  symbol,
  className,
  ...props
}) => {
  return (
    <section className={`mb-4 ${className}`}>
      {name && <label>{name}</label>}
      <div className="relative flex items-center gap-2">
        <Slider
          min={min}
          max={max}
          defaultValue={defaultValue}
          step={step}
          marks={marks}
          value={value}
          onChange={onChange}
          classNames="rc-slider-rail rc-slider-handle rc-slider-track rc-slider-dot"
          {...props}
        />
        <div className="w-[60px] flex items-center justify-center">
          {value} {symbol}
        </div>
      </div>
    </section>
  );
};

export default RangeSlider;
