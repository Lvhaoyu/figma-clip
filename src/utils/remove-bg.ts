import imglyRemoveBackground, { Config } from '@imgly/background-removal'

let config: Config = {
    model: 'medium',
    debug: true,
    proxyToWorker: false,
    publicPath: 'https://189966.xyz', // path to the wasm files
    progress: (key, current, total) => {
        console.log(`Progress for ${key}: ${current}/${total}`)
    }
}

export const removeBg = async (image: string) => {
    return imglyRemoveBackground(image, config).then((blob: Blob) => {
        return blob
    })
}
