<template>
    <div :class="['custom-step__center', currentStatus]" @click="stepClick">
        <!-- 图标 -->
        <div :class="'custom-step__head__' + direction">
            <slot name="icon">
                <img
                    :src="currentIcon.icon"
                    :class="[
                        'custom-status__icon',
                        { 'wait-icon': this.currentStatus === 'inactive' },
                    ]"
                />
                <!-- 线 -->
                <div
                    :class="[
                        'custom-step__line',
                        { active_horizontal: this.currentStatus === 'finish' },
                        direction,
                    ]"
                ></div>
            </slot>
        </div>
        <!-- 图标标题 -->
        <slot name="title">
            <div
                :class="['custom-step__title']"
                :style="{ '--active-color': currentIcon.color }"
            >
                {{ title }}
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            // 标题
            type: String,
            default: "",
        },
        status: {
            // 当前步骤状态、不设置则用steps来设置
            type: String,
            default: "",
        },
        inactiveColor: {
            // 未激活状态颜色
            type: String,
            default: "#999999",
        },
        activeColor: {
            // 激活状态颜色
            type: String,
            default: "#333333",
        },
        finishColor: {
            // 已完成状态颜色
            type: String,
            default: "#999999",
        },
        inactiveIcon: {
            // 未激活状态图标
            type: String,
            default: "https://front-xps-cdn.xsyx.xyz/2021/10/21/1673480348.png",
        },
        activeIcon: {
            // 激活状态图标
            type: String,
            default: "https://front-xps-cdn.xsyx.xyz/custom/store/666.jpeg",
        },
        finishIcon: {
            // 已完成状态图标
            type: String,
            default:
                "https://front-xps-cdn.xsyx.xyz/custom/store/images/checked.png",
        },
    },

    inject: ["direction", "active"],

    data() {
        return {
            index: -1,
            currentStatus: "",
        };
    },

    computed: {
        currentIcon() {
            const statusMap = {
                inactive: {
                    color: this.inactiveColor,
                    icon: this.inactiveIcon,
                },
                active: {
                    color: this.activeColor,
                    icon: this.activeIcon,
                },
                finish: {
                    color: this.finishColor,
                    icon: this.finishIcon,
                },
                default: {
                    color: this.inactiveColor,
                    icon: this.inactiveIcon,
                },
            };
            return statusMap[this.currentStatus] || statusMap.default;
        },
    },

    mounted() {
        console.log(this.$parent.$children,this._uid,'---==--')
        // parent 谨慎使用、不推荐
        this.index = this.$parent.$children.findIndex(
            (e) => e._uid === this._uid
        );
        this.$watch("$parent.active", (val) => this.updateStatus(val), {
            immediate: true,
        });
    },

    methods: {
        updateStatus(parentActive) {
            // 如果传入当前步骤状态则用当前状态
            if (this.status) {
                this.currentStatus = this.status;
                return;
            }
            // 如果当前组件index 与 父组件的active值相等 则是处于 激活状态
            // 如果当前组件index 小于 父组件的active值 则是已完成状态
            // 就如果都不是、默认未完成状态
            if (this.index === parentActive) {
                this.currentStatus = "active";
            } else if (this.index < parentActive) {
                this.currentStatus = "finish";
            } else {
                this.currentStatus = "inactive";
            }
        },

        // 点击step事件
        stepClick() {
            this.$parent.$emit("click-step", this.index);
        },
    },
};
</script>
<style scoped>
.custom-step__title {
    font-size: 14px;
    color: #909399;
}

.custom-step__center {
    flex: 1;
}

.custom-step__center .custom-step__line {
    position: absolute;
    right: -50%;
    left: 50%;
    height: 1px;
    z-index: 0;
}
.custom-step__center .custom-step__line.horizontal {
    border-top: 2px solid #cad6ee;
}

.active_horizontal {
    border-top: 2px solid #3d7bed !important;
}

.custom-step__center:last-of-type .custom-step__line {
    display: none;
}

.custom-step__center .custom-step__title {
    text-align: center;
    margin-top: 8px;
    font-weight: 500;
}

.custom-step__center .custom-step__head__horizontal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

/* .inactive, .active, .finish {
  &.custom-step__title {
    color: var(--active-color);
  }
} */
.inactive.custom-step__title{
     color: var(--active-color);
}
.active.custom-step__title{
     color: var(--active-color);
}
.finish.custom-step__title{
     color: var(--active-color);
}
.custom-status__icon {
    width: 16px;
    height: 16px;
    z-index: 1;
}

.wait-icon {
    padding: 4px;
    box-sizing: border-box;
    z-index: 1;
}
</style>
