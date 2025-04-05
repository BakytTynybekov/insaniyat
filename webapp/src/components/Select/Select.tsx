import { FormikProps } from "formik";
import { FaAngleDown } from "react-icons/fa";
import "./select.scss";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export const Select = ({
  name,
  label,
  required = false,
  formik,
  options,
  classname,
}: {
  required?: boolean;
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  options: string[];
  classname?: string;
}) => {
  const value = formik.values[name];

  return (
    <div className={`select-container ${classname}`}>
      <label>{label}</label>
      <div className="select-wrapper">
        <select
          className="select-field"
          name={name}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
          onBlur={() => {
            formik.setFieldTouched(name);
          }}
          value={value}
          required={required}
        >
          <option value="">Выберите...</option>

          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="select-arrow">
          <FaAngleDown size={18} />
        </div>
      </div>
    </div>
  );
};
