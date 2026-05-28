import type { CollectionConfig } from "payload";
import { getUploadDir, MediaSubDir } from "./base";
import { label } from "@/libs/utils";

export const HonorBanner: CollectionConfig = {
    slug: MediaSubDir.HonorBanner,
    labels: label('荣誉封面'),
    admin: {
        hidden: true
    },
    upload: {
        staticDir: getUploadDir(MediaSubDir.HonorBanner),
        imageSizes: [
            {
                name: 'cropped',
                width: 1500,
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

export const AwardImages: CollectionConfig = {
  slug: MediaSubDir.AwardImages,
  labels: label('奖项封面'),
  admin: {
      hidden: true
  },
  upload: {
      staticDir: getUploadDir(MediaSubDir.AwardImages),
      imageSizes: [
          {
              name: 'cropped',
              width: 380,
              height: 280,
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