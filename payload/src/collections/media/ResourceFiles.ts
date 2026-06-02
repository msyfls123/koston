import type { CollectionConfig } from "payload";
import { BaseImageConfig, getUploadDir, MediaSubDir } from "./base";
import { label } from "../../libs/utils";

export const ResourceFiles: CollectionConfig = {
    ...BaseImageConfig,
    slug: MediaSubDir.ResourceFiles,
    labels: label('下载资源文件'),
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.ResourceFiles),
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
}