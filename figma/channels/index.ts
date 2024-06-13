import { GetSelectedImages } from './get-selected-images'
import { ReplaceImage } from './replace-image'

export const initChannels = () => {
    const getSelectedImages = new GetSelectedImages()
    const replaceImage = new ReplaceImage()

    return [getSelectedImages, replaceImage]
}
