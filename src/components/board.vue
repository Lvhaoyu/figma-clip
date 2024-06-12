<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({ img: String })

const isRunning = computed(() => {
    return !!props.img
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
        <img src="../assets/demo.png" alt="demo" v-if="!isRunning" />
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

    img {
        width: 25%;
        height: auto;
    }
}
.board-empty {
    width: 100%;
    height: 100%;
    .mosaic-background();
}

.board-running {
    width: 100%;
    height: 100%;
    background-size: 100%; /* 背景图像宽度设置为容器宽度的 100% */
    background-repeat: no-repeat; /* 防止图像重复 */
    background-image: url('@/assets/work-space.png');
    box-shadow: 0px 43px 132px 10px rgba(0, 0, 0, 0.2);
}
</style>
