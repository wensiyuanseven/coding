<template>
    <demo-section>
        <van-tabs v-model="active">
            <van-tab title="用法示例">
                <demo-block title="基础用法">
                    <van-col span="6" @click="copy('search')">
                        <dam-icon name="search"></dam-icon>
                        <span>search</span>
                    </van-col>
                    <van-col span="6" @click="copy('code')">
                        <dam-icon name="code"></dam-icon>
                        <span>code</span>
                    </van-col>
                </demo-block>
                <demo-block title="徽标提示">
                    <van-col span="6" @click="copy('notice', { dot: true })">
                        <dam-icon name="notice" dot></dam-icon>
                        <span> notice </span>
                    </van-col>
                    <van-col span="6" @click="copy('trashcan', { badge: '9' })">
                        <dam-icon name="trashcan" badge="9"></dam-icon>
                        <span>trashcan </span>
                    </van-col>
                    <van-col span="6" @click="copy('more', { badge: '99+' })">
                        <dam-icon name="more" badge="99+"></dam-icon>
                        <span>more </span>
                    </van-col>
                </demo-block>
                <demo-block title="图标颜色">
                    <van-col
                        span="6"
                        @click="copy('plus-fill', { color: '#1989fa' })"
                    >
                        <dam-icon name="plus-fill" color="#1989fa"></dam-icon>
                    </van-col>
                    <van-col span="6" @click="copy('edit', { color: 'red' })">
                        <dam-icon name="edit" color="red"></dam-icon>
                    </van-col>
                </demo-block>
                <demo-block title="图标大小">
                    <van-col span="6" @click="copy('user', { size: '40' })">
                        <dam-icon name="user" size="40" />
                    </van-col>
                    <van-col span="6" @click="copy('user', { size: '3rem' })">
                        <dam-icon name="user" size="3rem" />
                    </van-col>
                </demo-block>
            </van-tab>
            <van-tab title="基础 icon">
                <van-col
                    v-for="icon in icons.basic"
                    :key="icon"
                    span="6"
                    @click="copy(icon)"
                >
                    <dam-icon :name="icon"></dam-icon>
                    <span class="elli">{{ icon }}</span>
                </van-col>
            </van-tab>
            <van-tab title="填充 icon">
                <van-col
                    v-for="icon in icons.fill"
                    :key="icon"
                    span="6"
                    @click="copy(icon)"
                >
                    <dam-icon :name="icon"></dam-icon>
                    <span class="elli">{{ icon }}</span>
                </van-col>
            </van-tab>
        </van-tabs>
    </demo-section>
</template>

<script>
import icons from '../../utils/icon-names'
// from https://30secondsofcode.org
function copyToClipboard(str) {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false

    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
    }
}

export default {
    data() {
        return {
            active: 0,
            icons
        }
    },

    methods: {
        copy(icon, option = {}) {
            let tag = `<dam-icon name="${icon}"`
            if ('dot' in option) {
                tag = `${tag} ${option.dot ? 'dot' : ''}`
            }
            if ('badge' in option) {
                tag = `${tag} badge="${option.badge}"`
            }
            if ('color' in option) {
                tag = `${tag} color="${option.color}"`
            }
            if ('size' in option) {
                tag = `${tag} size="${option.size}"`
            }
            tag = `${tag} />`
            copyToClipboard(tag)
            this.$notify({
                type: 'success',
                duration: 1500,
                message: `复制成功：${tag}`
            })
        }
    }
}
</script>

<style lang="less" scoped>
.van-doc-demo-block__title {
    padding: 12px 16px 16px;
}
.van-col {
    display: inline-block;
    float: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    span {
        display: block;
        height: 36px;
        margin: -4px 0 4px;
        padding: 0 5px;
        color: @gray-2;
        font-size: 12px;
        line-height: 18px;
    }
    &:active {
        background-color: @active-color;
    }
}
.elli {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.van-col--6 {
    width: 25%;
}
.van-icon {
    display: inline-block;
    margin: 16px 0 16px;
    // color: @text-color;
    font-size: 32px;
}
.van-tab__pane {
    width: auto;
    margin: 20px;
    background-color: #fff;
    border-radius: 12px;
}

/deep/ .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
    border: 0;
}
</style>
