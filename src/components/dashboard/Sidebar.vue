<template>
  <div
    class="flex flex-col bg-black w-24 h-dvh items-center min-w-20 z-10 sticky top-0"
  >
    <img :src="logo" alt="Logo CPV" width="75" height="75" />
    <div class="flex flex-col justify-between h-dvh">
      <div class="mt-8 flex flex-col justify-center items-center gap-6">
        <router-link to="/dashboard">
          <Home class="text-muted-foreground w-6 h-6" />
        </router-link>
        <router-link to="/customers">
          <UserRound class="text-muted-foreground w-6 h-6" />
        </router-link>
        <router-link to="/zone">
          <MapPin class="text-muted-foreground w-6 h-6" />
        </router-link>
        <router-link to="/campaign">
          <img src="../../assets/homeney_button.png" alt="Botão de rota para homeney" class="w-6 h-6">
        </router-link>
      </div>
      <div class="mb-8 flex flex-col justify-center items-center gap-6">
        <DatabaseBackup class="text-muted-foreground w-6 h-6 cursor-pointer" />
        <LogOut class="text-muted-foreground w-6 h-6 cursor-pointer"  @click="handleLogout"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "../../assets/logo_cpv.png";
import {
  Home,
  UserRound,
  MapPin,
  DatabaseBackup,
  LogOut,
} from "lucide-vue-next";
import { authService } from "@/services";
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = async () => {
  await authService.logout();
  router.push('/');
};
</script>
