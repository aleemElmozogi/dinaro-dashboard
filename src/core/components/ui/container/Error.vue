<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-4 my-32">
      <h1 class="text-4xl font-bold text-primaryDark">
         Error
      </h1>
      <p class="text-lg text-primaryDark">
        {{
          message ||
          "Oops! something went wrong, please contact with support team"
        }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
