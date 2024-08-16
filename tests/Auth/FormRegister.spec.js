import { mount } from '@vue/test-utils'
import FormularioRegistroUsuario from '../../src/components/Auth/FormRegister.vue'
import { describe, it, jest, expect } from '@jest/globals'
import { NInput, NAlert, NButton } from 'naive-ui'
import flushPromises from 'flush-promises'

jest.mock('@/stores/auth.ts', () => ({
  useAuthStore: () => ({
    register: jest.fn(() => Promise.resolve({ status: 200 })),
    getStatus: 200,
  }),
}))

describe('Formulario-Registro-Usuario', () => {
  it('reseta o formulário e exibe feedback de sucesso após o registro', async () => {
    const wrapper = mount(FormularioRegistroUsuario, {
      global: {
        components: {
          NInput, NAlert, NButton
        }
      }
    })
    
    await wrapper.vm.$nextTick() 

    const usernameInput = wrapper.find('#inputUsername input')
    const emailInput = wrapper.find('#inputEmail input')
    const passwordInput = wrapper.find('#inputPassword input')
    const btnRegister = wrapper.find('#buttonRegister')

    await usernameInput.setValue('Andrew')
    await emailInput.setValue('andrew@example.com')
    await passwordInput.setValue('********')

    expect(wrapper.find('#feedback').exists()).toBe(false)

    await btnRegister.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()

    const alertMessage = wrapper.findComponent(NAlert)

    expect(usernameInput.element.value).toBe("")
    expect(emailInput.element.value).toBe("")
    expect(passwordInput.element.value).toBe("")
    expect(alertMessage.text()).toBe("StatusUsuário cadastrado com sucesso!")
    expect(alertMessage.exists()).toBe(true)
    expect(wrapper.find('#feedback').exists()).toBe(true)
  })
})