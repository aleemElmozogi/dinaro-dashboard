<template>
  <aside
    :class="
      is_active
        ? 'translate-x-0 '
        : 'ltr:-translate-x-full rtl:translate-x-full'
    "
    class="fixed z-20 flex flex-col h-screen overflow-auto transition-transform duration-150 ease-in transform shadow-xl bg-background ltr:left-0 rtl:right-0 lg:static w-80 shadow-primary/10"
  >
    <div>
      <div
        class="flex items-center justify-between px-3 py-4 lg:justify-center"
      >
        <div class="flex items-center gap-4">
          <img
            src="/logo.svg"
            @click="
              $router.push({
                name: ERoutesName.MAIN,
              })
            "
            alt=""
            loading="lazy"
            class="h-12 cursor-pointer"
          />
          <h6 class="text-4xl font-medium">Dinaro</h6>
        </div>
        <button class="lg:hidden" @click="$emit('toggleSidebar')">
          <i class="text-3xl bx bx-menu"></i>
        </button>
      </div>
    </div>
    <template v-for="route in menu" :key="route.name">
      <div class="px-2">
        <router-link
          :to="{
            name: route.name,
          }"
          class="inline-flex flex-row items-center w-full gap-2 px-4 py-1"
          active-class="inline-flex flex-row items-center w-full gap-2 px-4 py-1 font-medium rounded-lg bg-primary"
        >
          <i :class="route.icon" class="text-xl"></i>
          <span class="mx-1 leading-10 text-md !whitespace-nowrap">{{
            route.title
          }}</span>
        </router-link>
      </div>
    </template>
  </aside>
</template>
<script lang="ts" setup>
import { navigationMenu } from "../constant/navigationMenu";
import { ref } from "vue";
import { ERoutesName } from "../constant/ERoutesName";

defineProps<{
  is_active: boolean;
}>();

defineEmits(["toggleSidebar"]);

const menu = ref(
  navigationMenu.map((item) => {
    return {
      ...item,
      is_active: false,
    };
  })
);
</script>
