import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";
import { label } from "../../libs/utils";

export const ProductImages: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.ProductImages,
    labels: label('产品配图'),
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.ProductImages),
        imageSizes: [
            {
                name: 'cropped',
                width: 668,
                height: 356,
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