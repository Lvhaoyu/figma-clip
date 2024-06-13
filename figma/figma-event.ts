import { getSelectedImages } from './channels/utils'

export class FigmaEventRegister {
    constructor() {
        this.registerFigmaEvent()
    }
    registerFigmaEvent = () => {
        figma.on('selectionchange', async () => {
            // 将包含图片的节点信息发送到 UI
            const imageInfos = await getSelectedImages()
            // 将包含图片的节点信息发送到 UI
            figma.ui.postMessage({
                type: 'selected-images',
                images: imageInfos
            })
        })
    }
}
