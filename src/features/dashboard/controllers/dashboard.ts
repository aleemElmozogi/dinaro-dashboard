import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { Container } from "typedi";
import PagedContent from "@/core/constant/IPagedContent";
import { CoreContentState } from "@/core/constant/CoreContentState";
import { CoreContentStatus } from "@/core/constant/CoreContentStatus";
import { DefaultQueryParams } from "../../../core/constant/DefaultQueryParams";

export const useDashboard = defineStore("DashboardStore", () => {
  //

  const state = reactive({
    content: {
      pageContent: [],
      numberOfPages: 1,
      pageSize: 0,
      pageNumber: 0,
    },
    contentState: new CoreContentState(),
    filterOptions: { ...DefaultQueryParams, search: "" },
  });

  const getStats = async () => {
    try {
      state.contentState.status = CoreContentStatus.loading;
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
    getStats
  } as const;
});
