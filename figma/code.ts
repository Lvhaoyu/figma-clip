/// <reference types="@figma/plugin-typings" />
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
    width: 480,
    height: 552
})

async function getSelectedImages() {
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
                console.log(2222222222)
                return {
                    id: node.id,
                    name: node.name,
                    base64: base64
                }
            }
        })
    )

    // 将包含图片的节点信息发送到 UI
    figma.ui.postMessage({
        type: 'selected-images',
        images: imageInfos
    })
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-selected-images') {
        getSelectedImages()
    }
    // figma.closePlugin()
}
