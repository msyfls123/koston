import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir } from "./base";
import { label } from "../../libs/utils";

export const RichTextImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: 'richtext-images',
    access: {
        read: () => true,
      },
    labels: label('富文本图片（不要编辑）'),
    upload: {
        staticDir: getUploadDir('richtext-images'),
        mimeTypes: [
            'image/png',
            'image/jpeg',
            'image/gif',
            'video/mp4',
            'video/avi'
        ],
        imageSizes: []
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
}