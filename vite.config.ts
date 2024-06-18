import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    plugins: [
        Unocss({
            mode: 'dist-chunk',
            presets: [presetAttributify(), presetUno()]
            // shortcuts: {
            //     'c-r': 'color-red'
            // }
        }),
        AutoImport({
            imports: [
                // presets
                'vue'
            ],
            dts: './src/auto-imports.d.ts'
        }),
        vue(),
        viteSingleFile()
    ],
    css: {
        // 预处理器配置项
        preprocessorOptions: {
            less: {
                math: 'always'
            }
        }
    },
    build: {
        // https://vitejs.cn/config/#build-csscodesplit
        cssCodeSplit: false,
        // https://vitejs.cn/config/#build-assetsinlinelimit
        assetsInlineLimit: 100000000,
        chunkSizeWarningLimit: 100000000,
        rollupOptions: {
            input: {
                index: 'index.html',
                code: 'figma/code.ts'
            },
            output: {
                entryFileNames: '[name].js'
            }
        }
    }
})
