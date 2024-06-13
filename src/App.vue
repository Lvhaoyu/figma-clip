<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { ArrowForward, Eliminate } from '@/icons'
import Board from '@/components/board.vue'

const img = ref('')
onMounted(() => {
    parent.postMessage({ pluginMessage: { type: 'get-selected-images' } }, '*')
})

// 接收来自插件代码的消息
onmessage = (event) => {
    const message = event.data.pluginMessage
    if (message.type === 'selected-images') {
        const images = message.images
        if (images) {
            img.value = images[0].base64
        }
    }
}

const btnDisabled = computed(() => {
    return !img.value
})

// Base64 转 Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
    const binaryString = atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes
}

const handleClickBtn = () => {
    parent.postMessage({ pluginMessage: { type: 'replace-image', imageData: base64ToUint8Array(img.value) } }, '*')
}
</script>

<template>
    <div :class="$style['container']">
        <div :class="$style['body']"><Board :img="img" /></div>
        <div :class="$style['footer']">
            <div :class="$style['content']">
                <span>🥝 剩余 5 次</span><span>加购次数 <ArrowForward :class="['buy-icon']" /></span>
            </div>
            <div :class="$style['operate']">
                <Button :class="$style['operate-btn']" type="primary" size="large" :disabled="btnDisabled" @click="handleClickBtn"
                    ><Eliminate :class="$style['operate-icon']" />一键抠图（消耗 1 次）</Button
                >
            </div>
        </div>
    </div>
</template>

<style module lang="less">
.flex {
    display: flex;
    align-items: center;
}
.container {
    width: 480px;
    display: flex;
    flex-direction: column;

    .body {
        height: 480px;
        width: 480px;
    }

    .footer {
        .flex();
        justify-content: space-between;
        padding: 16px 20px;
        height: 40px;

        background: linear-gradient(
                0deg,
                var(--background-color-disabled, rgba(255, 255, 255, 0.12)) 0%,
                var(--background-color-disabled, rgba(255, 255, 255, 0.12)) 100%
            ),
            #1a1c1d;
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
}
</style>
