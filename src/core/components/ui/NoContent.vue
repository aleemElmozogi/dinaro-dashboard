<template>
  <div
    v-bind="$attrs"
    class="flex flex-col items-center justify-center gap-5 py-12 text-center"
  >
    <iframe
      class="mx-auto"
      src="https://lottie.host/?file=7af8364c-d18a-4d1f-847b-3d884ac566ea/IyaJVhARLZ.json"
    ></iframe>
    <p class="">{{ message || "لا يوجد نتائج لعرضها" }}</p>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  message?: string
}>()
</script>
