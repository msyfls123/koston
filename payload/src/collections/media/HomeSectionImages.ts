import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";
import { label } from "../../libs/utils";

export const HomeSectionImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.HomeSectionImages,
    labels: label('主页模块图'),
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.HomeSectionImages),
        imageSizes: [
            {
                name: 'cropped',
                width: 720,
                height: 500,
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