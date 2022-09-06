# file-util
阿里云，七牛云、上传能力的封装，file，blob，base64之间的相互转换，以及文件常用的能力

## Installation

```
npm install file-util
//or
yarn add file-util
```
### Typical use:

```javascript
import { uploadFileToAliOss, AliOptions } from 'file-util'

export const uploadFileToOSS = async (file: File,path: string,baseUrl: string, options: AliOptions, argument?: Object) => {
  return uploadFileToAliOss(file, path, baseUrl, options, argument)
}

```

