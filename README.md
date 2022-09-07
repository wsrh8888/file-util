# file-utils-plus
阿里云，七牛云、上传能力的封装，file，blob，base64之间的相互转换，以及文件常用的能力

## Installation

```
npm install file-utils-plus
//or
yarn add file-utils-plus
```

### Ali-oss use:

```javascript
import { uploadFileToAliOss, AliOptions } from 'file-utils-plus'

export const uploadFileToOSS = async (file: File,path: string,baseUrl: string, options: AliOptions, argument?: Object) => {
  return uploadFileToAliOss(file, path, baseUrl, options, argument)
}

```

### Qiniu-oss use:

```javascript
import { uploadFileToQiniuOss } from 'file-utils-plus'

export const uploadFileToQiniuOss = async (file: File, path: string,baseUrl:string,token: string, argument?: Object) => {
  return uploadFileToAliOss(file, path, baseUrl, token, argument)
}

```

### Methods

## Documentation

1. get file md5

    ```javascript
    import { getMd5 } from 'file-utils-plus'
    getMd5(File)
    ```
    