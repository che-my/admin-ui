import { mount } from '@vue/test-utils'
import Copyright from '../index.vue'

describe('Copyright.vue', () => {
  test('render', () => {
    const wrapper = mount(Copyright, {
      props: {},
    })
    expect(wrapper.classes()).toContain('copyright')
  })
})
