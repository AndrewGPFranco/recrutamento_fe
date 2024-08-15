import { shallowMount } from '@vue/test-utils';
import FormularioRegistroUsuario from '../../src/components/Auth/FormRegister.vue';
import { useAuthStore } from '../../src/stores/auth';
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    register: jest.fn(),
  }),
}));

describe('Formulario-Registro-Usuario.vue', () => {
  it('reseta o formulário após o registro', async () => {
    const wrapper = shallowMount(FormularioRegistroUsuario);

    const usernameInput = wrapper.find('input[placeholder="Usuário"]');
    const loginInput = wrapper.find('input[placeholder="Email"]');
    const passwordInput = wrapper.find('input[placeholder="Senha"]');
    const registerButton = wrapper.find('button');

    await usernameInput.setValue('andrew');
    await loginInput.setValue('andrew@email.com');
    await passwordInput.setValue('minhasenha');

    await registerButton.trigger('click');

    expect(usernameInput.element).toBe('');
    expect(loginInput.element).toBe('');
    expect(passwordInput.element).toBe('');

    const authStore = useAuthStore();
    expect(authStore.register).toHaveBeenCalledWith('andrew', 'andrew@email.com', 'minhasenha');
  });
});
