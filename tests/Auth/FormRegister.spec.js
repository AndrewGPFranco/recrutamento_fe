import { shallowMount } from '@vue/test-utils';
import FormularioRegistroUsuario from '../../src/components/Auth/FormRegister.vue';
import { useAuthStore } from '../../src/stores/auth.ts';
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('@/stores/auth.ts', () => ({
  useAuthStore: () => ({
    register: jest.fn(() => Promise.resolve({ status: 200 })),
    getStatus: 200,
  }),
}));

describe('Formulario-Registro-Usuario.vue', () => {
  it('reseta o formulário e exibe feedback de sucesso após o registro', async () => {
    const wrapper = shallowMount(FormularioRegistroUsuario);

    const usernameInput = wrapper.find('#username input'); 
    const loginInput = wrapper.find('#email'); 
    const passwordInput = wrapper.find('#password input');
    const registerButton = wrapper.find('button');

    await usernameInput.setValue('andrew'); 
    await loginInput.setValue('andrew@email.com'); 
    await passwordInput.setValue('minhasenha'); 

    await registerButton.trigger('click');

    await wrapper.vm.$nextTick(); 

    expect(usernameInput.element.value).toBe('');
    expect(loginInput.element.value).toBe('');
    expect(passwordInput.element.value).toBe('');

    const feedbackAlert = wrapper.findComponent('n-alert');
    expect(feedbackAlert.exists()).toBe(true);
    expect(feedbackAlert.props('title')).toBe('Status');
    expect(feedbackAlert.props('type')).toBe('success');
    expect(feedbackAlert.text()).toBe('Usuário cadastrado com sucesso!');

    const authStore = useAuthStore();
    expect(authStore.register).toHaveBeenCalledWith('andrew', 'andrew@email.com', 'minhasenha');

    jest.runAllTimers(); 
    await wrapper.vm.$nextTick(); 

    expect(wrapper.findComponent('n-alert').exists()).toBe(false);
  });
});