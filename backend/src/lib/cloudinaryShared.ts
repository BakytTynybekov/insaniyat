type CloudinaryUploadType = {
  folder: string;
  transformation?: string;
  format: string;
  presets: Record<string, string>;
  // resource_type?: "image" | "raw"; // Добавляем поддержку разных типов файлов
};

export const cloudinaryUploadTypes = {
  avatar: {
    folder: "avatars",
    transformation: "w_400,h_400,c_fill",
    format: "png",
    presets: {
      small: "w_120,h_120,c_fill",
      big: "w_400,h_400,c_fill",
    },
  },
  image: {
    folder: "images",
    transformation: "w_1000,h_1000,c_limit",
    format: "jpg",
    presets: {
      preview: "w_200,h_200,c_fit,q_80",
      large: "w_1000,h_1000,c_limit,q_80",
    },
  },
  // pdf: {
  //   folder: "pdfs",
  //   format: "pdf",
  //   resource_type: "raw",
  //   presets: {
  //     original: "",
  //     thumbnail: "w_200,h_200,c_fit",
  //   },
  // },
} satisfies Record<string, CloudinaryUploadType>;

type CloudinaryUploadTypes = typeof cloudinaryUploadTypes;
export type CloudinaryUploadTypeName = keyof CloudinaryUploadTypes;
export type CloudinaryUploadPresetName<TTypeName extends CloudinaryUploadTypeName> =
  keyof CloudinaryUploadTypes[TTypeName]["presets"];

export const getCloudinaryUploadUrl = <TTypeName extends CloudinaryUploadTypeName>(
  cloudinaryCloudName: string,

  publicId: string,
  typeName: TTypeName,
  presetName: CloudinaryUploadPresetName<TTypeName>
) => {
  const type = cloudinaryUploadTypes[typeName] as CloudinaryUploadType;
  const preset = type.presets[presetName as string];
  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${preset}/${publicId}`;
};

export const getAvatarUrl = (
  cloudinaryCloudName: string,

  publicId: string | null | undefined,
  preset: keyof CloudinaryUploadTypes["avatar"]["presets"]
) =>
  publicId
    ? getCloudinaryUploadUrl(cloudinaryCloudName, publicId, "avatar", preset)
    : getCloudinaryUploadUrl(
        cloudinaryCloudName,
        "v1695811282/avatars/avatar-placeholder",
        "avatar",
        preset
      );
