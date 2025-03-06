/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FormikProps } from "formik";
import "./input.scss";

export const Input = ({
  type,
  name,
  label,
  required = false,
  formik,
}: {
  required?: boolean;
  type: string;
  name: string;
  label: string;
  formik: FormikProps<any>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        type={type}
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
        disabled={formik.isSubmitting}
      />
      {!!touched && !!error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
