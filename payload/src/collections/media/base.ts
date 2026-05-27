import path from 'path'

export const UPLOAD_BASE_DIR = path.join('upload')

export const getUploadDir = (subdir: string) => path.join(UPLOAD_BASE_DIR, subdir)

export enum MediaSubDir {
    IndustryImages = 'industry-images',
    RichTextImages = 'richtext-images',
}

const normalize = (url: string) => url.replace(/\\/g, '/')

export const getStaticPath = (subdir: string, fileName: string) =>
    normalize(path.join('upload', subdir, fileName))

export const getStaticUrl = (subdir: string, fileName: string) => {
    const staticPath = getStaticPath(subdir, fileName)
    return normalize(
        process.env.IN_DOCKER ? path.join('/', staticPath)
                              : new URL(`/api/${subdir}/file/${fileName}`, 'http://localhost:3000').href
    )
}