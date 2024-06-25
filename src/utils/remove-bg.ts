import { removeBackground, Config } from '@imgly/background-removal'

let config: Config = {
    debug: true,
    proxyToWorker: false,
    device: 'gpu',
    publicPath: 'https://189966.xyz', // path to the wasm files
    progress: (key, current, total) => {
        console.log(`Progress for ${key}: ${current}/${total}`)
    }
}

export const removeBg = async (image: string) => {
    return removeBackground(image, config).then((blob: Blob) => {
        return blob
    })
}
