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
import WalletService from "@/features/wallet/services/WalletService";
import { WalletResponseDto } from "../models/WalletResponseDto";
import { useRoute } from "vue-router";

interface WalletState {
  content: PagedContent<WalletResponseDto>;
  contentState: CoreContentState;
  filterOptions: IDefaultQueryParams;
}

export const useWallets = defineStore("WalletStore", () => {
  const _repo = Container.get(WalletService);
  const route = useRoute();
  const toast = useToast();
  //

  const state = reactive<WalletState>({
    content: {
      pageContent: [],
      numberOfPages: 1,
      pageSize: 0,
      pageNumber: 0,
    },
    contentState: new CoreContentState(),
    filterOptions: { ...DefaultQueryParams },
  });

  const getWallets = async (request = DefaultQueryParams) => {
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

  const fetchById = async (id: string) => {
    try {
      if(id == undefined)
        return ;
      state.contentState.status = CoreContentStatus.loading;
      const { data } = await _repo.show(id);
      state.contentState.status = CoreContentStatus.success;
      return data.content;
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.message;
      throw error;
    }
  };

  const charge = async (walletId: string, amount: number) => {
    try {
      state.contentState.status = CoreContentStatus.loading;
      const response = await _repo.charge(walletId, amount);
      state.contentState.status = CoreContentStatus.success;
      toast.success("تم عملية شحن المحفظة بنجاح   ");
      return response;
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.message;
      throw error;
    }
  };

  const updateFilterOptions = (newOptions: IDefaultQueryParams) => {
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
      getWallets(newVal);
    }
  );

  return {
    content: computed(() => state.content),
    contentState: computed(() => state.contentState),
    filterOptions: ref(state.filterOptions),
    fetchById,
    getWallets,
    charge,
    updateFilterOptions,
  } as const;
});
