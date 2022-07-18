import React from "react";
import Image from "next/image";
import Router from "next/router";
import useSWR from "swr";
import * as Yup from "yup";
import {
  Formik,
  Field,
  Form
} from "formik";
import { ICollection } from "types";
import { api } from "@lib/api";
import { fetchWrapper } from "@util/fetchWrapper";
import {
  TextInput,
  TextArea,
  SelectCustom,
  ImageUpload,
} from "@module/Input";
import { Preview } from "@element/SVG";
import { RiLoader4Fill } from "react-icons/ri";


const category_endpoint = process.env.NEXT_PUBLIC_CATEGORIES

const collectionSchema = Yup.object().shape({
  name: Yup.string().min(4, "Too Short!").required("Required"),
  url: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  logo: Yup.string().required("Required"),
  banner: Yup.string().required("Required"),
});

async function fetcher(url: string) {
  const res = await fetchWrapper(url)
  return res
}

const MyCollection:React.FC = () => {
  const { data: categoryData } = useSWR(category_endpoint, fetcher)
  
  const initialValues: ICollection = {
    name: undefined,
    url: undefined,
    description: undefined,
    category: undefined,
    logo: undefined,
    banner: undefined,
  };

  async function handleSubmit(val, actions) {
    actions.setSubmitting(true);
    const save = await api.saveCollection(val);
    save.id && Router.push("/collection");
  }

  return <div>
      <Formik
        initialValues={initialValues}
        validationSchema={collectionSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({
          values,
          errors,
          isSubmitting,
          isValidating,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => (
          <Form className="flex items-center justify-between">
            <div className="lg:w-7/12 px-12">
              {values.banner && (
                <div className="gradientBorder relative">
                  <span className="block rounded w-full object-contain mt-4 mx-auto perspective h-[230px] w-full mt-10 object-cover overflow-hidden">
                    <Image
                      src={values.banner}
                      alt={values.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </span>
                </div>
              )}

              {values.logo ? (
                <div className="relative">
                  <span className="block rounded w-full object-contain mt-4 mx-auto perspective h-[130px] w-[130px] object-contain bg-black rounded mx-auto -mt-12 overflow-hidden">
                    <Image
                      src={values.logo}
                      alt={values.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </span>
                </div>
              ) : <Preview />}
            </div>
            <div className="flex flex-col space-y-5 w-full lg:w-5/12">
              <Field
                name="name"
                label="Name"
                component={TextInput}
                errors={errors.name}
              />

              <Field
                name="url"
                label="URL"
                component={TextInput}
                errors={errors.url}
              />

              <SelectCustom
                name="category"
                label="Category"
                data={categoryData ? categoryData : []}
                activeCategory={values.category}
              />

              <Field
                label="Description"
                name="description"
                component={TextArea}
                errors={errors.description}
              />

              <ImageUpload label="Logo" name="logo" />

              <ImageUpload label="Banner" name="banner" />

              <button
                type="submit"
                className={`flex items-center justify-center space-x-2 w-full px-4 py-2 text-white text-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded shadow-lg ${isSubmitting && "opacity-50 pointer-events-none"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span>Submitting...</span>{" "}
                    <RiLoader4Fill className="animate-spin text-white" />
                  </>
                ) : (
                  <span>Create</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
}

export default MyCollection