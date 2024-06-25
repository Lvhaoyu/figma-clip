<script setup lang="ts">
import Board from '～/components/board.vue'
import Operate from '～/components/operate.vue'

const img = ref('')
const loading = ref(false)
onMounted(() => {
    parent.postMessage({ pluginMessage: { type: 'get-selected-images' } }, '*')
})

const changeLoading = (status: boolean) => {
    loading.value = status
}

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
</script>

<template>
    <div :class="$style['container']">
        <div :class="$style['body']"><Board :img="img" :loading="loading" /></div>
        <div :class="$style['footer']">
            <Operate :img="img" :loading="loading" @change-loading="changeLoading" />
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
}
</style>
