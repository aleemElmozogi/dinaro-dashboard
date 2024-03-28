import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { Container } from "typedi";
import PagedContent from "@/core/constant/IPagedContent";
import { CoreContentState } from "@/core/constant/CoreContentState";
import { CoreContentStatus } from "@/core/constant/CoreContentStatus";
import { DefaultQueryParams } from "../../../core/constant/DefaultQueryParams";
import DashboardService from "../services/Dashboard";

export const useDashboard = defineStore("DashboardStore", () => {
  const _repo = Container.get(DashboardService);

  //

  const state = reactive({
    content: {
      usersCount: 0,
      depositTransactionsCount: 0,
      transferTransactionsCount: 0,
      totalIncomes: 0,
    },
    contentState: new CoreContentState(),
  });

  const getStats = async () => {
    try {
      state.contentState.status = CoreContentStatus.loading;
      const response = await _repo.statis();
      state.content = response.data.content;
      state.contentState.status = CoreContentStatus.success;
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.messages[0];
      throw error;
    }
  };

  return {
    content: computed(() => state.content),
    contentState: computed(() => state.contentState),
    getStats,
  } as const;
});
