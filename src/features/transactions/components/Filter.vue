<template>
  <div class="flex items-center gap-4 my-3">
    <SearchInput />
  </div>
  <div class="flex items-center gap-4 my-3">
    <SelectField
      name="trasactionState"
      @change="
        (value) =>
          controller.updateFilterOptions({
            ...controller.filterOptions,
            state: value,
          })
      "
      v-model="controller.filterOptions.state"
      class="w-64"
      label="حالة العملية"
    >
      <option v-for="item in getTransactionStateOptions" :value="item.value">
        {{ item.label }}
      </option>
    </SelectField>
    <SelectField
      name="trasactionType"
      @change="
        (value) =>
          controller.updateFilterOptions({
            ...controller.filterOptions,
            type: value,
          })
      "
      v-model="controller.filterOptions.type"
      class="w-64"
      label="نوع العملية"
    >
      <option v-for="item in getTransactionTypeOptions" :value="item.value">
        {{ item.label }}
      </option>
    </SelectField>
    <div class="my-5">
      <label for="password">من</label>
      <input
        name="from"
        id="from"
        type="datetime-local"
        placeholder="من"
        class="input"
        v-model="controller.filterOptions.from"
        @input="
              (event) =>
                controller.updateFilterOptions({
                  ...controller.filterOptions,
                  from: ((event.target as any)?.value) || undefined,
                })
            "
      />
    </div>
    <div class="my-5">
      <label for="password">الى</label>
      <input
        name="to"
        id="to"
        type="datetime-local"
        placeholder="من"
        class="input"
        v-model="controller.filterOptions.to"
        @input="
              (event) =>
                controller.updateFilterOptions({
                  ...controller.filterOptions,
                  to: ((event.target as any)?.value) || undefined,
                })
            "
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTransactions } from "../controllers/transactionsController";
import SelectField from "@/core/components/ui/selectFiled/SelectField.vue";
import { getTransactionTypeOptions } from "../../../core/constant/ETransactionType";
import SearchInput from "@/core/components/ui/searchInput/SearchInput.vue";
import { getTransactionStateOptions } from "../../../core/constant/ETransactionState";

const controller = useTransactions();
</script>
