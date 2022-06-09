import { mount } from '@vue/test-utils'
import SvgIcon from '../index.vue'

describe('SvgIcon.vue', () => {
  test('render', () => {
    const wrapper = mount(SvgIcon, {
      props: {},
    })
    expect(wrapper.classes()).toContain('svg-icon')
  })
})
