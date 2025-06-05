/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CloudinaryUploadPresetName,
  CloudinaryUploadTypeName,
  getCloudinaryUploadUrl,
} from "@insaniyat/shared/src/cloudinary";
import { trpc } from "../../lib/trpc";
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import "./index.scss";
import { env } from "../../lib/env";
import { FiUpload, FiTrash2, FiUser, FiImage } from "react-icons/fi";

const useUploadToCloudinary = (type: CloudinaryUploadTypeName) => {
  const prepareCloudinaryUpload = trpc.prepareCloudinaryUpload.useMutation();

  const uploadToCloudinary = async (file: File) => {
    const { preparedData } = await prepareCloudinaryUpload.mutateAsync({ type });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", preparedData.timestamp);
    formData.append("folder", preparedData.folder);
    formData.append("transformation", preparedData.transformation);
    formData.append("eager", preparedData.eager);
    formData.append("signature", preparedData.signature);
    formData.append("api_key", preparedData.apiKey);

    return await fetch(preparedData.url, {
      method: "POST",
      body: formData,
    })
      .then(async (rawRes) => {
        return await rawRes.json();
      })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        return {
          publicId: res.public_id as string,
          res,
        };
      });
  };

  return { uploadToCloudinary };
};

export const AvatarUpload = <TTypeName extends CloudinaryUploadTypeName>({
  name,
  formik,
  type,
  preset,
}: {
  name: string;
  formik: FormikProps<any>;
  type: TTypeName;
  preset: CloudinaryUploadPresetName<TTypeName>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name] as boolean;
  const invalid = touched && !!error;
  const disabled = formik.isSubmitting;

  const inputEl = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const { uploadToCloudinary } = useUploadToCloudinary(type);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setLoading(true);
    try {
      const { publicId } = await uploadToCloudinary(file);
      void formik.setFieldValue(name, publicId);
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
  };

  return (
    <div className={`avatar-upload ${disabled ? "disabled" : ""}`}>
      <div
        className={`upload-container ${dragActive ? "drag-active" : ""} ${
          invalid ? "error" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          required={true}
          className="file-input"
          type="file"
          disabled={loading || disabled}
          accept="image/*"
          ref={inputEl}
          onChange={({ target: { files } }) => {
            if (files?.[0]) handleFile(files[0]);
          }}
        />

        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Загружается...</span>
          </div>
        ) : value ? (
          <div className="avatar-preview">
            <img
              className="avatar-image"
              alt="User avatar"
              src={getCloudinaryUploadUrl(
                env.VITE_CLOUDINARY_CLOUD_NAME,
                value,
                type,
                preset
              )}
            />
            <div className="avatar-overlay">
              <button
                type="button"
                className="change-btn"
                onClick={() => inputEl.current?.click()}
                disabled={disabled}
              >
                <FiUpload size={18} />
                Изменить
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon-container">
              <FiUser size={24} />
            </div>
            <div className="instructions">
              <p>Перетащите сюда свою фотографию</p>
              <p className="small">или</p>
              <button
                type="button"
                className="browse-btn"
                onClick={() => inputEl.current?.click()}
                disabled={disabled}
              >
                Выбрать файл
              </button>
            </div>
          </div>
        )}

        {dragActive && (
          <div className="drag-overlay">
            <FiUpload size={32} />
            <p>Drop your photo here</p>
          </div>
        )}
      </div>

      {value && !loading && (
        <button
          type="button"
          className="remove-btn"
          onClick={() => {
            void formik.setFieldValue(name, null);
            formik.setFieldError(name, undefined);
            void formik.setFieldTouched(name);
          }}
          disabled={disabled}
        >
          <FiTrash2 size={16} />
          Remove photo
        </button>
      )}

      {invalid && <div className="error-message">{error}</div>}
    </div>
  );
};

export const ImageUpload = <TTypeName extends CloudinaryUploadTypeName>({
  name,
  formik,
  type,
  preset,
  aspectRatio = "16/9",
}: {
  name: string;
  formik: FormikProps<any>;
  type: TTypeName;
  preset: CloudinaryUploadPresetName<TTypeName>;
  aspectRatio?: string;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name] as boolean;
  const invalid = touched && !!error;
  const disabled = formik.isSubmitting;

  const inputEl = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const { uploadToCloudinary } = useUploadToCloudinary(type);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      formik.setFieldError(name, "Please upload an image file");
      return;
    }

    setLoading(true);
    try {
      const { publicId } = await uploadToCloudinary(file);
      formik.setFieldValue(name, publicId);
    } catch (err: any) {
      formik.setFieldError(name, err.message);
    } finally {
      formik.setFieldTouched(name, true, false);
      setLoading(false);
      if (inputEl.current) inputEl.current.value = "";
    }
  };

  return (
    <div className={`collection-upload ${disabled ? "disabled" : ""}`}>
      <div
        className={`upload-area ${dragActive ? "drag-active" : ""} ${
          invalid ? "error" : ""
        }`}
        style={{ aspectRatio }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={inputEl}
          accept="image/*"
          disabled={loading || disabled}
          onChange={({ target: { files } }) => files?.[0] && handleFile(files[0])}
        />

        {loading ? (
          <div className="upload-loading">
            <div className="spinner"></div>
            <span>Uploading image...</span>
          </div>
        ) : value ? (
          <>
            <img
              src={getCloudinaryUploadUrl(
                env.VITE_CLOUDINARY_CLOUD_NAME,
                value,
                type,
                preset
              )}
              alt="Collection cover"
              className="collection-image"
            />
            <div className="image-overlay">
              <button
                type="button"
                className="change-btn"
                onClick={() => inputEl.current?.click()}
              >
                <FiUpload size={18} />
                Change Image
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <FiImage size={48} className="empty-icon" />
            <div className="upload-instructions">
              <p>Drag & drop your collection image here</p>
              <p className="or-text">or</p>
              <button
                type="button"
                className="browse-btn"
                onClick={() => inputEl.current?.click()}
              >
                Select Image
              </button>
            </div>
          </div>
        )}

        {dragActive && (
          <div className="drag-overlay">
            <FiUpload size={40} />
            <p>Drop your image here</p>
          </div>
        )}
      </div>

      {value && !loading && (
        <button
          type="button"
          className="remove-btn"
          onClick={() => {
            formik.setFieldValue(name, null);
            formik.setFieldError(name, undefined);
            formik.setFieldTouched(name);
          }}
        >
          <FiTrash2 size={16} />
          Remove Image
        </button>
      )}

      {invalid && <div className="error-message">{error}</div>}
    </div>
  );
};
