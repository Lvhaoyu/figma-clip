<template>
    <svg
        role="img"
        aria-label="arrow-forward"
        class="gdesign-icon gdesign-icon-arrow-forward"
        focusable="false"
        data-icon="arrow-forward"
        aria-hidden="true"
        v-on="$listeners"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.1893 11.2501L13.4697 5.53039L14.5303 4.46973L22.0607 12.0001L14.5303 19.5304L13.4697 18.4697L19.1893 12.7501H2V11.2501H19.1893Z"
            fill="currentColor"
        />
    </svg>
</template>
<script>
import { useInsertStyles } from './utils.ts'

export default {
    name: 'IconArrowForward',
    beforeCreate() {
        useInsertStyles()
    }
}
</script>
