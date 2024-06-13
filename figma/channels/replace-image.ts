import { IMessageChannel } from './types'
import { clone } from './utils'

export class ReplaceImage implements IMessageChannel {
    getName(): string {
        return 'replace-image'
    }

    handle = (msg: { type: string; imageData: Uint8Array }) => {
        const { imageData } = msg

        const nodes = figma.currentPage.selection
        if (nodes.length === 0) {
            figma.notify('Please select an image frame.')
            return
        }
        const image = figma.createImage(imageData)

        for (const node of nodes) {
            if (node.type === 'RECTANGLE' && node.fills.length > 0 && node.fills[0].type === 'IMAGE') {
                const newFills = clone(node.fills)
                newFills[0].imageHash = image.hash
                node.fills = newFills
            }
        }

        figma.notify('Image replaced successfully!')
    }
}
