import { IMessageChannel } from './types'
import { getSelectedImages } from './utils'

export class GetSelectedImages implements IMessageChannel {
    getName(): string {
        return 'get-selected-images'
    }

    handle = async () => {
        const imageInfos = await getSelectedImages()
        // 将包含图片的节点信息发送到 UI
        figma.ui.postMessage({
            type: 'selected-images',
            images: imageInfos
        })
    }
}
