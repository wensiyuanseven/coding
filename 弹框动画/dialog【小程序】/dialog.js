// components/base/selfDialog/dialog.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: ''
        },
        leftButtonText: {
            type: String,
            value: '退出'
        },
        rightButtonText: {
            type: String,
            value: '再想想'
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeMask() {
            this.setData({
                show: false
            })
        },
        leftButton() {
            this.triggerEvent('leftButtonEvent');
        },
        rightButton() {
            this.triggerEvent('rightButtonEvent');
        },
        disableCatchTouch() {
            return false
        }

    }
})
