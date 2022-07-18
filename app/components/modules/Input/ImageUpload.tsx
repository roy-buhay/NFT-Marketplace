import React from "react";
import { useField } from "formik";
import { api } from "@lib/api";
import { Error } from "@module/Input";
import { RiLoader4Fill } from "react-icons/ri";

export interface IProps {
  label: string,
  name: string
}

export const ImageUpload:React.FC<IProps> = ({label, name}) => {
  const [field, meta, helpers] = useField(name);
  const [uploading, setUploading] = React.useState<boolean>(false);

  async function onChange(e) {
    setUploading(true);

    const file = e.target.files[0];
    const url = await api.uploadImage(file);

    url && helpers.setValue(url);
    url && setUploading(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <label htmlFor={label} className="block text-white mb-1">
            {label}
          </label>
          <Error error={meta.error} />
        </div>  
        <div className="flex items-center justify-center">
          <label className="cursor-pointer">
            <span className="font-light text-[#818181] underline">
              {uploading ? (
                <RiLoader4Fill className="animate-spin text-[#818181]" />
              ) : (
                "Upload Image"
              )}
            </span>
            <input
              type="file"
              name={name}
              className="opacity-0 fixed top-0 left-0"
              onChange={onChange}
            />
          </label>
        </div>
      </div>
      
    </div>
  );
}
