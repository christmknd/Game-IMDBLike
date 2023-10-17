import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import RegisterForm from '@/components/auth/RegisterForm.vue'


describe('LoginForm', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(RegisterForm)
    expect(wrapper.vm).toBeTruthy()
  })

  test('contains form elements', () => {
    const wrapper = mount(RegisterForm)
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.find('input#username').exists()).toBeTruthy()
    expect(wrapper.find('input#email').exists()).toBeTruthy()
    expect(wrapper.find('input#password').exists()).toBeTruthy()
    expect(wrapper.find('button[type="submit"]').exists()).toBeTruthy()
  })

 
})