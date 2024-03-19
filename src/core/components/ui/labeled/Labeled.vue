<template>
  <div class="flex flex-col gap-1 my-2">
    <label :for="label" class="">{{ label }}:</label>
    <Avatar v-if="isAvatar">
      <AvatarImage :src="value || ''" :alt="avatarAlt" />
      <AvatarFallback>{{ avatarAlt }}</AvatarFallback>
    </Avatar>
    <p v-else :labelname="label" class="text-lg font-bold text-primaryDark">
      {{ value || "unkown" }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";

defineProps<{
  avatarAlt?: string;
  isAvatar?: boolean;
  label: string;
  value: string;
}>();
</script>
