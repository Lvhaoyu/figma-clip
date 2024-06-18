/// <reference types="@figma/plugin-typings" />

export function clone(val: any) {
    return JSON.parse(JSON.stringify(val))
}

type ImageInfos = {
    id: string
    name: string
    base64: string
}[]

export async function getSelectedImages(): Promise<ImageInfos | []> {
    // 获取当前选中的所有节点
    const selection = figma.currentPage.selection
    // 过滤选中的节点，找出包含图片填充的节点
    const imageNodes = selection
        .filter((node) => {
            if (node.type === 'RECTANGLE' || node.type === 'FRAME') {
                const fills = node.fills

                if (fills && Array.isArray(fills)) {
                    // 速度极快
                    return fills.some((fill) => fill.type === 'IMAGE')
                }
            }
            return false
        })
        .filter(Boolean)
        .slice(0, 1)

    const imageInfos = await Promise.all(
        imageNodes.map(async (node) => {
            const fills = (node as any).fills
            const imageFill = fills.find((fill) => fill.type === 'IMAGE')
            if (imageFill) {
                const image = figma.getImageByHash(imageFill.imageHash)
                if (!image) {
                    return null
                }
                const bytes = await image.getBytesAsync()
                const base64 = figma.base64Encode(bytes)
                return {
                    id: node.id,
                    name: node.name,
                    base64: base64
                }
            }
            return null
        })
    )

    if (imageInfos.length) {
        return imageInfos.filter(Boolean) as ImageInfos
    }
    return []
}
