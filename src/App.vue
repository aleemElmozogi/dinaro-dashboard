<script setup lang="ts">
import { RouterView } from "vue-router";
import {Theme} from "@/core/constant/Theme.ts";
import {onMounted} from "vue";

onMounted(() => {
  if (localStorage.theme === Theme.DARK || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add(Theme.DARK)
  } else {
    document.documentElement.classList.remove(Theme.DARK)
  }
})

</script>

<template>
  <RouterView />
</template>
