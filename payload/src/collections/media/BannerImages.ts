import type { CollectionConfig } from "payload";
import { getUploadDir, MediaSubDir } from "./base";

export const BannerImages: CollectionConfig = {
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