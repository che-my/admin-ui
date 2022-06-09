import { mount } from '@vue/test-utils'
import AppLayout from '../index.vue'

describe('AppLayout.vue', () => {
  test('render', () => {
    const wrapper = mount(AppLayout, {
      props: {},
    })
    expect(wrapper.classes()).toContain('app-layout')
  })
})
