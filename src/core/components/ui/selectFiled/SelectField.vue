<template>
  <div>
    <label :for="name"> {{ label }} </label>
    <Field
      :name="name"
      :id="name"
      as="select"
      v-model="modelValue"
      class="input"
      @change="$emit('change', modelValue)"
    >
      <option value="" disabled hidden>select...</option>
      <slot />
    </Field>
    <ErrorMessage :name="name" class="error-message" />
  </div>
</template>
<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";


const modelValue = defineModel<string | number>();

defineEmits(["change"]);

defineProps<{
  name: string;
  label: string;
}>();
</script>
