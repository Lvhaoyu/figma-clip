<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { ArrowForward, Eliminate } from '@/icons'
import Board from '@/components/board.vue'

const count = ref(5)

const create = () => {
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count: count.value } }, '*')
}

const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
</script>

<template>
    <div :class="$style['container']">
        <div :class="$style['body']"><Board /></div>
        <div :class="$style['footer']">
            <div :class="$style['content']">
                <span>🥝 剩余 5 次</span><span>加购次数 <ArrowForward :class="['buy-icon']" /></span>
            </div>
            <div :class="$style['operate']">
                <Button :class="$style['operate-btn']" type="primary" size="large"
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
