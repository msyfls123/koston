import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";

export const IndustryImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.IndustryImages,
    labels: {
        singular: '行业封面图',
        plural: '行业封面图'
    },
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.IndustryImages),
        imageSizes: [
            {
                name: 'square',
                width: 800,
                height: 800,
                position: 'centre'
            },
            {
              name: 'thumbnail',
              width: 350,
              height: 150,
              position: 'centre'
            }
        ],
        mimeTypes: ['image/png', 'image/jpeg']
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
}