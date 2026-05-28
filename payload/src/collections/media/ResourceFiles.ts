import type { CollectionConfig } from "payload";
import { getUploadDir, MediaSubDir } from "./base";
import { label } from "../../libs/utils";

export const ResourceFiles: CollectionConfig = {
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