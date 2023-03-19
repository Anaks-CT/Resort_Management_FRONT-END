import React from "react";
import classNames from "classnames";

type props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder: string;
  class: string;
  type: 'number' | 'text' | 'password'
  value: string | number | undefined
  name: string
};



function Input({ onChange, required, placeholder, type, value, name, ...rest }: props) {

  const classes = classNames(
    rest.class,
    "border-0 border-b-2 border-white box-border p-[16px] block w-full bg-[#1E1E1E] bg-opacity-70 text-white tracking-wide"
  );
  return (
    <input
      type={type}
      className={classes}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      name={name}
    />
  );
}

export default Input;
