<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from "../components/ui/input/Input.vue";
import Button from "../components/ui/button/Button.vue";
import logo from "../assets/logo_cpv.png";
import { authService } from '@/services';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();

const handleLogin = async () => {
  error.value = null;
  try {
    await authService.login(email.value, password.value);
    router.push('/dashboard');
    
  } catch (err) {
    error.value = 'Usuário ou senha inválidos';
  }
};
</script>

<template>

    <main class="flex min-w-[440px]">
      <div class="flex flex-col px-24 bg-black h-dvh justify-center">
      <img
        :src="logo"
        class="self-center"
        alt="Logo CPV"
        width="180"
        height="180"
      />
      <h2 class="text-white text-3xl font-semibold mb-6">Acessar</h2>
      <div class="flex flex-col gap-4">
        <Input placeholder="Email" class="w-auto"/>
        <Input placeholder="Senha" type="password" class="w-auto"/>
      </div>
      <p v-if="error" class="text-sm text-red-500 mt-2">{{ error }}</p>
      <Button class="mt-6" primary @click="handleLogin">Entrar</Button>
    </div>
    <div class="w-full h-dvh bg-white">
      <img 
      class="object-cover w-full h-dvh"
      src="../assets/background_authentication.png" 
      alt="">
    </div>
    </main>

</template>
