import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";
import { label } from "../../libs/utils";

export const WechatImage: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.WechatImage,
    labels: label('微信图'),
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.WechatImage),
        imageSizes: [
            {
                name: 'cropped',
                width: 300,
                height: 300,
                position: 'centre'
            },
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