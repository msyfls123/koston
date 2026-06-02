import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir } from "./base";

export const RichTextImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: 'richtext-images',
    access: {
        read: () => true,
      },
    labels: {
        singular: '富文本图片',
        plural: '富文本图片'
    },
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