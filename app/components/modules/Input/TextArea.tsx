import { Error } from "@module/Input";
import { IInput } from "types";

export const TextArea:React.FC<IInput> = ({ field, label, errors }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={field.name} className="block text-white">
        {label} {errors ? <Error error={errors} /> : null}
      </label>
      <textarea {...field} className={`px-4 py-2 resize-none w-full h-24 border-[3px] border-transparent ${
          errors && "border-red-600"
        }`} />
    </div>
  );
}
