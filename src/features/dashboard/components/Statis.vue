<template>
  <div
    class="grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-8 lg:gap-10 xl:gap-12"
  >
    <div
      v-for="item in stats"
      :key="item.title"
      class="p-3 bg-white border-b-8 border-gray-200 shadow lg:p-5 rounded-xl"
    >
      <p class="text-xl text-gray-900">{{ item.title }}</p>
      <p class="text-3xl font-bold">{{ item.value }}</p>

      <i class="block text-end text-7xl bx bx-equalizer"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDashboard } from "../controllers/dashboard";
import { ref, watch } from 'vue';

const controller = useDashboard();

const stats = ref([
  {
    title: "عدد المستخدمين",
    value: controller.content.usersCount,
  },
  {
    title: "عدد طلبات السحب'",
    value: controller.content.depositTransactionsCount,
  },
  {
    title: "عدد عمليات التحويل",
    value: controller.content.transferTransactionsCount,
  },
  {
    title: "اجمالي الارباح",
    value: controller.content.totalIncomes,
  },
]);


watch(() => controller.content, () => {
  stats.value = [
    {
      title: "عدد المستخدمين",
      value: controller.content.usersCount,
    },
    {
      title: "عدد طلبات السحب'",
      value: controller.content.depositTransactionsCount,
    },
    {
      title: "عدد عمليات التحويل",
      value: controller.content.transferTransactionsCount,
    },
    {
      title: "اجمالي الارباح",
      value: controller.content.totalIncomes,
    },
  ];
});
</script>
