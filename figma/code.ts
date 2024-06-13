/// <reference types="@figma/plugin-typings" />

import { FigmaEventRegister } from './figma-event'
import { initChannels } from './channels'

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
    width: 480,
    height: 552
})
new FigmaEventRegister()

const channels = initChannels()

figma.ui.onmessage = async (msg) => {
    const channel = channels.find((channel) => channel.getName() === msg.type)
    if (channel) {
        await channel.handle(msg)
    }
}
