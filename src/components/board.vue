<script setup lang="ts">
import { base64ToImage } from '@/utils'

const props = defineProps({ img: String })

const isRunning = computed(() => {
    return !!props.img
})
const url = computed(() => {
    if (props.img) return base64ToImage(props.img)
})
</script>
<template>
    <div
        :class="{
            [$style['board']]: true,
            [$style['board-empty']]: !isRunning,
            [$style['board-running']]: isRunning
        }"
    >
        <img src="../assets/demo.png" alt="demo" v-if="!isRunning" draggable="false" />
        <img :src="url" alt="clip-running" v-else draggable="true" />
    </div>
</template>

<style module lang="less">
@import '@/css/common.less';

.board {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.board-running {
    width: 100%;
    height: 100%;
    .mosaic-background();
    img {
        max-width: 100%;
        height: auto;
    }
}

.board-empty {
    img {
        width: 25%;
        height: auto;
    }
    width: 100%;
    height: 100%;
    background-size: 100%; /* 背景图像宽度设置为容器宽度的 100% */
    background-repeat: no-repeat; /* 防止图像重复 */
    background-image: url('@/assets/work-space.png');
    box-shadow: 0px 43px 132px 10px rgba(0, 0, 0, 0.2);
}
</style>
