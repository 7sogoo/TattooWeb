import React, { useState } from "react";
import { Input } from "../ui/input";
import { SvgEye, SvgEyeClosed } from "../Svgs";

interface InputPasswordProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({ onChange, placeholder, name }) => {
  const [passwordIsShown, setPasswordIsShown] = useState<boolean>(false);

  const toggleVisibility = () => {
    setPasswordIsShown((prev) => !prev);
  };

  return (
    <div className="flex relative">
      <Input
        onChange={onChange}
        name={name}
        type={passwordIsShown ? "text" : "password"}
        className="h-10"
        required
        placeholder={placeholder}
      />
      <div
        onClick={toggleVisibility}
        className="cursor-pointer absolute right-2 top-2"
      >
        {passwordIsShown ? <SvgEye /> : <SvgEyeClosed />}
      </div>
    </div>
  );
};
