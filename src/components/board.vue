<script setup lang="ts">
import { base64ToImage } from '～/utils'

const props = defineProps({ img: { type: String, default: '' }, loading: { type: Boolean, default: false } })

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
        <div :class="$style['loading']" v-show="loading"></div>
    </div>
</template>

<style module lang="less">
@import '～/css/common.less';

.board {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // animation
    position: relative;
    overflow: hidden;
}
.board-running {
    width: 100%;
    height: 100%;
    .mosaic-background();
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
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
    background-image: url('～/assets/work-space.png');
    box-shadow: 0px 43px 132px 10px rgba(0, 0, 0, 0.2);
}
@keyframes moveDown {
    0% {
        top: 0;
    }
    100% {
        top: 100%;
    }
}
// animation
.loading {
    position: absolute;
    width: 100%;
    height: 120px;
    opacity: 0.6;
    animation: moveDown 3s infinite ease-in-out;
    background: linear-gradient(270deg, rgba(188, 70, 252, 0.8) 42.93%, rgba(188, 70, 252, 0) 126.25%);
}
</style>
