import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";

export const NewsImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.NewsImages,
    labels: {
        singular: '新闻图',
        plural: '新闻图'
    },
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.NewsImages),
        imageSizes: [
            {
                name: 'cropped',
                width: 1320,
                height: 790,
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