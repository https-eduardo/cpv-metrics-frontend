<script setup lang="ts">
import Input from "../components/ui/input/Input.vue";
import Button from "../components/ui/button/Button.vue";
import logo from "../assets/logo_cpv.png";
</script>

<template>
  <div class="flex min-h-dvh">
    <main class="p-24 flex flex-col bg-black min-w-[440px] justify-center pt-8">
      <img
        :src="logo"
        class="self-center"
        alt="Logo CPV"
        width="180"
        height="180"
      />
      <h2 class="text-white text-3xl font-semibold mb-6">Acessar</h2>
      <div class="flex flex-col gap-4">
        <Input placeholder="Email" />
        <Input placeholder="Senha" />
      </div>
      <Button class="mt-6" primary>Entrar</Button>
    </main>
    <div></div>
  </div>
</template>
