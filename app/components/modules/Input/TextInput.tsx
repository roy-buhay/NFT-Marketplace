import React from "react";
import { Error } from "@module/Input";
import { IInput } from "types";

export const TextInput:React.FC<IInput> = ({ field, label, errors, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={field.name} className="block text-white">
        {label} {errors ? <Error error={errors} /> : null}
      </label>
      <input
        {...field}
        {...props}
        className={`px-4 py-2 resize-none w-full border-[3px] border-transparent text-lg ${
          errors && "border-red-600"
        }`}
      />
      
    </div>
  );
}
