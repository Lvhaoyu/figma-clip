<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { ArrowForward, Eliminate } from '@/icons'
import { base64ToImage, base64ToUint8Array, removeBg, uint8ArrayToBase64 } from '@/utils'
const props = defineProps({ img: { type: String, default: '' } })

const btnDisabled = computed(() => {
    return !props.img
})

const handleClickBtn = async () => {
    const data: Blob = await removeBg(base64ToImage(props.img))
    data.arrayBuffer()
        .then((arrayBuffer) => {
            const uint8Array = new Uint8Array(arrayBuffer)
            const base64String = uint8ArrayToBase64(uint8Array)
            parent.postMessage({ pluginMessage: { type: 'replace-image', imageData: base64ToUint8Array(base64String) } }, '*')
        })
        .catch((error) => {
            console.error('Error converting Blob to ArrayBuffer:', error)
        })
}
</script>

<template>
    <div :class="$style['content']">
        <span>🥝 剩余 5 次</span><span>加购次数 <ArrowForward :class="['buy-icon']" /></span>
    </div>
    <div :class="$style['operate']">
        <Button :class="$style['operate-btn']" type="primary" size="large" :disabled="btnDisabled" @click="handleClickBtn"
            ><Eliminate :class="$style['operate-icon']" />一键抠图（消耗 1 次）</Button
        >
    </div>
</template>

<style module lang="less">
.flex {
    display: flex;
    align-items: center;
}

.content {
    .flex();
    span:first-of-type {
        color: var(--static-color-white, #fff);
        font: var(--text-p1-regular);

        margin-right: 10px;
    }
    span:last-of-type {
        .flex();
        color: var(--text-color-emphasis, #4172fa);
        font: var(--text-p1-bold);

        .buy-icon {
            font-size: 16px;
            margin-left: 4px;
        }
    }
}

.operate {
    .flex();
    .operate-btn {
        margin-right: 4px;
        color: var(--button-color-primary-regular, rgba(255, 255, 255, 0.8));
        font-family: var(--font-family-body, 'PingFang SC');
        font-size: var(--button-font-size-medium, 14px);
        font-weight: 500;
    }

    .operate-icon {
        font-size: 16px;
        margin-right: 4px;
    }
}
</style>
