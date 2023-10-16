import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LoginForm from "../components/auth/LoginForm.vue"


describe('LoginForm', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(LoginForm)
    expect(wrapper.vm).toBeTruthy()
  })
})