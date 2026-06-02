import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";

export const BannerImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.BannerImages,
    labels: {
        singular: '横幅图',
        plural: '横幅图'
    },
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.BannerImages),
        imageSizes: [
            {
                name: 'cropped',
                width: 2400,
                height: 720,
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