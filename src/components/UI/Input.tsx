import React, { useState } from "react";
import classNames from "classnames";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

type props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder: string;
  class?: string;
  type: "number" | "text" | "password" | "file" | "text";
  value?: string | number | undefined;
  name: string;
};

function Input({
  onChange,
  required,
  placeholder,
  type,
  value,
  name,
  ...rest
}: props) {
  const classes = classNames(
    "border-0 border-b md:border-b-2 border-white box-border p-[16px] block w-full bg-transparent bg-opacity-70 text-white tracking-wide",
    rest.class
  );
  const [seePassword, setSeePassword] = useState(false);
  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  if (type === "password") {
    return (
      <div className="w-full relative">
        <input
          type={seePassword ? "text" : "password"}
          className={classes}
          required={required}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          value={value}
          name={name}
        />
        {seePassword ? (
          <BsEyeFill
            onClick={handleSeePassword}
            className="cursor-pointer absolute top-1/2 right-3 text-white"
          />
        ) : (
          <BsEyeSlashFill
            onClick={handleSeePassword}
            className="cursor-pointer absolute top-1/2 right-3 text-white"
          />
        )}
      </div>
    );
  }
  return (
    <input
      type={type}
      className={classes}
      required={required}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      value={value}
      name={name}
    />
  );
}

export default Input;
