/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FormikProps } from "formik";
import "./textarea.scss";
export const Textarea = ({
  name,
  label,
  formik,
  required = false,
}: {
  name: string;
  label: string;
  required?: boolean;
  formik: FormikProps<any>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
        required={required}
      />
      {!!touched && !!error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
