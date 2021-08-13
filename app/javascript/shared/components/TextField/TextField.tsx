import React from "react";

export interface TextFieldProps {
  label: string;
  type: "text" | "email" | "password";
  value: string | number;
  placeholder?: string;
  onChange: (e: React.BaseSyntheticEvent) => void;
}

export const TextField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: TextFieldProps) => {
  const name = label.split(" ").join("-");

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};
