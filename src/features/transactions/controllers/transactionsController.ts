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
import {
  TransactionResponseDto,
  WithdrawRequest,
} from "../models/TransactionResponseDto";
import TranactionsService from "../services/TransactionsService";
import { TransactionState } from "@/core/constant/ETransactionState";
import { useRoute } from "vue-router";

interface TransactionsState {
  content: PagedContent<TransactionResponseDto>;
  withdrawRequestContent: PagedContent<WithdrawRequest>;
  contentState: CoreContentState;
  filterOptions: ITransactionsRequestDto;
}

export const useTransactions = defineStore("TransactionsStore", () => {
  const route = useRoute();
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
    withdrawRequestContent: {
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
      state.contentState.message = error.data?.message;
      throw error;
    }
  };

  const getWithdrawRequest = async (request = DefaultQueryParams) => {
    try {
      state.contentState.status = CoreContentStatus.loading;
      const response = await _repo.withdrawRequest(request);
      state.contentState.status = CoreContentStatus.success;
      state.withdrawRequestContent = response.data.content;
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.message;
      throw error;
    }
  };

  const approveWithdrawRequest = async (id: string) => {
    try {
      state.contentState.status = CoreContentStatus.loading;
      const response = await _repo.changeState(id, TransactionState.Approved);
      state.contentState.status = CoreContentStatus.success;
      toast.success("تم تغيير حالة العملية بنجاح");
      toast.success(response.data.content);
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.message;
      throw error;
    }
  };

  const rejectWithdrawRequest = async (id: string) => {
    try {
      state.contentState.status = CoreContentStatus.loading;
      const response = await _repo.changeState(id, TransactionState.Rejected);
      state.contentState.status = CoreContentStatus.success;
      toast.success("تم تغيير حالة العملية بنجاح");
      toast.success(response.data.content);
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.message;
      throw error;
    }
  };

  const updateFilterOptions = (newOptions: ITransactionsRequestDto) => {    
    state.filterOptions = { ...state.filterOptions, ...newOptions };
  };


  watch(
    () => route.query,
    () => {
      const queryParams = {
        ...state.filterOptions,
        ...route.query,
      };
      updateFilterOptions(queryParams);
    }
  );

  watch(
    () => state.filterOptions,
    (newVal) => {
      getTransactions(newVal);
    }
  );

  return {
    content: computed(() => state.content),
    withdrawRequestContent: computed(() => state.withdrawRequestContent),
    contentState: computed(() => state.contentState),
    filterOptions: computed(() => state.filterOptions),
    getWithdrawRequest,
    getTransactions,
    updateFilterOptions,
    approveWithdrawRequest,
    rejectWithdrawRequest,
  } as const;
});
