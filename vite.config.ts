import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

const deps = Object.keys(pkg.dependencies)

export default defineConfig({
  plugins: [
    dts({
      outputDir: 'dist/types',
      include: ['src/**/*'],
      staticImport: true,
      insertTypesEntry: true,
      logDiagnostics: true
    })
  ],

  build: {
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
    target: 'esnext',

    lib: {
      entry: 'src/index.ts',
      name: 'fileUploadUtils',
      fileName: 'index'
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external(id: string) {
        return deps.some((k) => new RegExp(`^${k}`).test(id))
      }
    }
  }
})
