<template>
  <transition name="slide-fade">
    <div
      id="Container"
      v-if="init"
      class="p-5 rounded-lg bg-primary-foreground shadow-primary"
    >
      <template v-if="coreContentstate">
        <template v-if="coreContentstate.status == CoreContentStatus.pure">
        </template>
        <template v-if="coreContentstate.status == CoreContentStatus.loading">
          <SkeltonLoading />
        </template>
        <template v-if="coreContentstate.status == CoreContentStatus.failure">
          <div class="h-full">
            <Error :message="coreContentstate.message" />
          </div>
        </template>
        <template v-if="coreContentstate.status == CoreContentStatus.success">
          <div class="h-full">
            <slot name="content"></slot>
          </div>
        </template>
      </template>
      <template v-else>
        <slot name="content"></slot>
      </template>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import SkeltonLoading from "@/core/components/ui/container/SkeltonLoading.vue";
import { CoreContentStatus } from "@/core/constant/CoreContentStatus.ts";
import Error from "@/core/components/ui/container/Error.vue";
import { ICoreContentState } from "@/core/constant/CoreContentState";

const init = ref(false);

onMounted(() => {
  init.value = true;
});

defineProps<{
  coreContentstate?: ICoreContentState;
}>();
</script>
