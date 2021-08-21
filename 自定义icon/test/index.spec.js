import { mount } from '@vue/test-utils'
import DemoButton from '../../demo-button'
// https://vue-test-utils.vuejs.org/zh/
// https://juejin.cn/post/6930475738646708237
// https:// juejin.cn/post/6844904196244766728
test('test icon', () => {
    const wrapper = mount(DemoButton)
    expect(wrapper).toMatchSnapshot()
})
