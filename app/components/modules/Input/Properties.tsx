import { useState } from "react";
import { IAttribute } from "types";
import { Field, FieldArray, FormikHelpers, useField } from "formik";
import { TextInput } from "@module/Input";
import { BiImageAlt, BiPlus, BiMinus } from "react-icons/bi";
import {
  MdOutlineClose,
  MdOutlineAdd,
  MdEditAttributes,
  MdRemove,
  MdAdd,
} from "react-icons/md";

export interface IProps {
  label: string,
  values: IAttribute[]
}

export const Properties:React.FC<IProps> = ({ label, values }) => {
  const [addProperties, setAddProperties] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-white"> Properties </p>
        <button
          type="button"
          className="block font-light text-[#818181] underline cursor-pointer"
          onClick={() => setAddProperties(true)}
        >
          Add Items
        </button>
      </div>

      <div
        className={`${
          addProperties
            ? "visible translate-y-[-50%] z-10"
            : "invisible translate-y-[-45%] -z-50"
        }  fixed top-2/4 left-2/4 -translate-x-1/2 z-10 w-1/3 bg-[#101010] py-6 px-8 drop-shadow-2xl transition ease-out duration-300`}
      >
        <FieldArray
          name="attributes"
          render={(arrayHelpers) => {
            return (
              <div>
                <label className="block mb-2 text-lg text-white"> {label} </label>
                <span className="font-light text-[#616161] block mb-3">
                  Properties show up underneath your item, are clickable, and
                  can be filtered in your collection&#39s sidebar.
                </span>
                <button
                  type="button"
                  className="hover:bg-black/10 p-2 absolute top-0 right-0"
                >
                  <MdOutlineClose
                    className="text-2xl text-[#363636]"
                    onClick={() => setAddProperties(false)}
                  />
                </button>
                {values.length > 0 &&
                  values.map((paramList, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row items-center space-x-2"
                      >
                        {Object.keys(paramList).map((param) => (
                          <Field
                            name={`attributes.${index}.${param}`}
                            placeholder={`${param}`}
                            label=""
                            key={`${param}`}
                            component={TextInput}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="flex items-center justify-center text-xs p-1 text-black"
                        >
                          <MdRemove className="text-xl text-white" />
                        </button>
                      </div>
                    );
                  })}
                <button
                  type="button"
                  onClick={() => arrayHelpers.push(values)}
                  className="block text-right text-sm text-[#616161] font-light underline mt-4"
                >
                  Add Property
                </button>
              </div>
            );
          }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-start">
        {values.map((attr) => {
          if (attr.key && attr.value) {
            return (
              <div className="border border-white flex flex-col items-center justify-center m-w-[1rem] h-16 p-6 mr-2 mb-2">
                <span className="font-light text-white text-sm">
                  {attr.key}
                </span>
                <span className="text-white text-xl">{attr.value}</span>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

