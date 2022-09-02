export interface ImageSize {
  height: number //宽度
  width: number //高度
}

export interface AliOptions {
  accessKeyId: string
  accessKeySecret: string
  securityToken: string
  bucket: string
  region: string
}

export interface UploadInfo {
  height?: number //图片的高度
  width?: number //图片的宽度
  md5: string //md5
  name: string //名字
  url: string //完整url地址
  rate?: number
  sampleCount?: number
  ext: string //后缀名
  duration: number //音频时常
  //argument 透传的argument
}

export interface FileInfo {
  file: File
  path: string
  baseUrl: string
  name: string
}

export enum Type {
  image,
  audio
}
