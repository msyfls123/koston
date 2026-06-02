import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";

export const TimelineImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.TimelineImages,
    labels: {
        singular: '时间线图片',
        plural: '时间线图片'
    },
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.TimelineImages),
        imageSizes: [
            {
                name: 'cropped',
                width: 640,
                height: 400,
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