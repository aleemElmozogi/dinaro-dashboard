<template>
  <div
    class="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-16"
  >
    <div
      v-for="item in stats"
      :key="item.title"
      class="p-3 bg-white border-b-8 border-gray-200 shadow lg:p-5 rounded-xl"
    >
      <p class="text-xl text-gray-900">{{ item.title }}</p>
      <p class="text-3xl font-bold">{{ item.value }}</p>

      <i
        class="block text-end text-7xl bx bx-equalizer"
      ></i>
    </div>
  </div>
</template>

<script lang="ts" setup>

const stats = [
  { color: "blue-400", title: "عدد المستخدمين", value: 100 },
  { color: "green-400", title: "عدد الطلبات", value: 200 },
  { color: "purple-500", title: "عدد اي شي", value: 300 },
];
</script>
