import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { Container } from "typedi";
import PagedContent from "@/core/constant/IPagedContent";
import { CoreContentState } from "@/core/constant/CoreContentState";
import { CoreContentStatus } from "@/core/constant/CoreContentStatus";
import {
  DefaultQueryParams,
  IDefaultQueryParams,
} from "../../../core/constant/DefaultQueryParams";
import { useToast } from "vue-toastification";
import {
  DefaultTransactionsRequestDto,
  ITransactionsRequestDto,
} from "../models/TransactionsRequestDto";
import { TransactionResponseDto } from "../models/TransactionResponseDto";
import TranactionsService from "../services/TransactionsService";

interface TransactionsState {
  content: PagedContent<TransactionResponseDto>;
  contentState: CoreContentState;
  filterOptions: ITransactionsRequestDto;
}

export const useTransactions = defineStore("TransactionsStore", () => {
  const _repo = Container.get(TranactionsService);
  const toast = useToast();
  //

  const state = reactive<TransactionsState>({
    content: {
      pageContent: [],
      numberOfPages: 1,
      pageSize: 0,
      pageNumber: 0,
    },
    contentState: new CoreContentState(),
    filterOptions: { ...DefaultTransactionsRequestDto },
  });

  const getTransactions = async (request = DefaultTransactionsRequestDto) => {
    try {
      state.contentState.status = CoreContentStatus.loading;
      const response = await _repo.index(request);
      state.contentState.status = CoreContentStatus.success;
      state.content = response.data.content;
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.messages[0];
      throw error;
    }
  };

  const updateFilterOptions = (newOptions: IDefaultQueryParams) => {
    state.filterOptions = { ...state.filterOptions, ...newOptions };
  };

  watch(
    () => state.filterOptions,
    (newVal) => {
      getTransactions(newVal);
    }
  );

  return {
    content: computed(() => state.content),
    contentState: computed(() => state.contentState),
    filterOptions: ref(state.filterOptions),
    getTransactions,
    updateFilterOptions,
  } as const;
});
