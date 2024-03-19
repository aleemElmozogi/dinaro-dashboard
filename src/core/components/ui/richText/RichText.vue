<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill";

const modelValue = defineModel<string>();

defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="">
    <label for="content" class=""> {{ label }} </label>

    <QuillEditor
      id="content"
      name="content"
      contentType="html"
      theme="snow"
      :content="modelValue"
      @update:content="(val:string) => modelValue = val"
      class="w-full p-2 border-none rounded-md bg-primary-foreground h-96"
    />

    <ErrorMessage name="content" class="text-sm text-red-500" />
  </div>
</template>
