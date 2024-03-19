<template>
  <div>
    <label :for="name"> {{ label }} </label>
    <Multiselect
      :name="name"
      :id="name"
      v-model="modelValue"
      :options="options"
      track-by="value"
      label="label"
      :multiple="multiple || false"
      class=" !text-sm !border !rounded-md !border-input !bg-background text-primary !ring-offset-background file:!border-0 file:!bg-transparent file:!text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50"
      :object="object"
      :mode="mode || 'single'"
    />
    <ErrorMessage :name="name" class="error-message" />
  </div>
</template>

<script lang="ts" setup>
import Multiselect from "@vueform/multiselect";
import { ErrorMessage } from "vee-validate";

const modelValue = defineModel<{ label: string; value: string }[]>();

defineProps<{
  label: string;
  name: string;
  multiple?: boolean;
  object?: boolean;
  mode: "single" | "multiple" | "tags";
  options: { label: string; value: string }[];
}>();
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
