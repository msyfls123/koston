import type { CollectionConfig } from "payload";
import { getUploadDir, MediaSubDir } from "./base";
import { label } from "../../libs/utils";

export const StarProductImages: CollectionConfig = {
    slug: MediaSubDir.StarProductImages,
    labels: label('明星产品封面图'),
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.StarProductImages),
        imageSizes: [
            {
                name: 'top',
                width: 1100,
                height: 750,
                position: 'centre'
            },
            {
              name: 'normal',
              width: 1040,
              height: 460,
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