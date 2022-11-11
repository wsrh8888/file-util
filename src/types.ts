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
}

export interface UploadOss {
  file: File //文件
  path: string //上传的路径
  baseUrl: string //域名
  fileName?: string //文件名字，如果没有默认为该文件的md5
  argument?: any //自定义参数
}

export interface AliUploadOss extends UploadOss {
  options: AliOptions //ali oss数据
}

export interface QiNiuUploadOss extends UploadOss {
  token: string //凭证
}
