<template>
    <div
        :class="'custom-steps--' + direction"
        :style="{ 'background-color': background }"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            // 当前激活的步骤
            type: Number,
            default: 0,
        },
        direction: {
            // 容器方向
            type: String,
            validator(value) {
                return ["horizontal", "vertical"].find((e) => e === value);
            },
            default: "horizontal",
        },
        background: {
            // 容器背景颜色
            type: String,
            default: "#ffffff",
        },
    },

    provide() {
        return {
            direction: this.direction,
            active: this.active,
        };
    },
};
</script>

<style scoped>
.custom-steps--horizontal {
    display: flex;
}

.custom-steps--vertical {
    display: flex;
    flex-direction: column;
}
</style>
