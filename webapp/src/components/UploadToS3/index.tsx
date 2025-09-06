/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from "formik";
import { trpc } from "../../lib/trpc";
import { useRef, useState } from "react";
import Button from "../Button/Button";
import { getS3UploadName, getS3UploadUrl } from "@insaniyat/backend/src/lib/s3Shared";

export const UseUploadToS3 = () => {
  const prepareS3Upload = trpc.prepareS3Upload.useMutation();

  const uploadToS3 = async (file: File) => {
    try {
      const { signedUrl, s3Key } = await prepareS3Upload.mutateAsync({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      if (!signedUrl.startsWith("https://")) {
        throw new Error("Invalid S3 URL");
      }

      console.log("Attempting upload to:", signedUrl);
      // Добавьте перед fetch

      const response = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
          "x-amz-acl": "private",
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      return { s3Key };
    } catch (error) {
      console.error("S3 Upload Error:", error);
      throw new Error("File upload failed. Please try again.");
    }
  };

  return { uploadToS3 };
};

export const UploadToS3 = ({
  label,
  name,
  formik,
}: {
  label: string;
  name: string;
  formik: FormikProps<any>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name] as boolean;
  const invalid = touched && !!error;
  const disabled = formik.isSubmitting;

  const inputEl = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const { uploadToS3 } = UseUploadToS3();

  return (
    <div className={`field ${disabled ? "disabled" : ""}`}>
      <input
        className="fileInput"
        type="file"
        disabled={loading || disabled}
        accept="*"
        ref={inputEl}
        onChange={({ target: { files } }) => {
          void (async () => {
            setLoading(true);
            try {
              if (files?.length) {
                const file = files[0];
                const { s3Key } = await uploadToS3(file);
                void formik.setFieldValue(name, s3Key);
              }
            } catch (err: any) {
              console.error(err);
              formik.setFieldError(name, err.message);
            } finally {
              void formik.setFieldTouched(name, true, false);
              setLoading(false);
              if (inputEl.current) {
                inputEl.current.value = "";
              }
            }
          })();
        }}
      />
      <label className={"label"} htmlFor={name}>
        {label}
      </label>
      {!!value && !loading && (
        <div className={"uploads"}>
          <div className={"upload"}>
            <a
              className={"uploadLink"}
              target="_blank"
              href={getS3UploadUrl(value)}
              rel="noreferrer"
            >
              {getS3UploadName(value)}
            </a>
          </div>
        </div>
      )}
      <div className="buttons">
        <div>
          <Button
            type="button"
            onClick={() => inputEl.current?.click()}
            disabled={loading || disabled}
          >
            {value ? "Загрузить другой файл" : "Загрузить"}
          </Button>
          {!!value && !loading && (
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                void formik.setFieldValue(name, null);
                formik.setFieldError(name, undefined);
                void formik.setFieldTouched(name);
              }}
              disabled={disabled}
            >
              Удалить
            </Button>
          )}
        </div>
      </div>
      {invalid && <div className="error">{error}</div>}
    </div>
  );
};
