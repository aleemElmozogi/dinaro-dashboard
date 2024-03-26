import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import { Container } from "typedi";
import PagedContent from "@/core/constant/IPagedContent";
import { CoreContentState } from "@/core/constant/CoreContentState";
import { CoreContentStatus } from "@/core/constant/CoreContentStatus";
import {
  DefaultFetchUsersRequestDto,
  FetchUsersRequestDto,
  FetchUsersResponseDto,
} from "../models/fetchUsersDto";
import UsersService from "../services/UsersService";
import { DefaultQueryParams } from "../../../core/constant/DefaultQueryParams";
import { UserStatus } from "@/core/constant/UserStatus";

interface UsersState {
  content: PagedContent<FetchUsersResponseDto>;
  contentState: CoreContentState;
  filterOptions: FetchUsersRequestDto;
}

export const useUsers = defineStore("UsersStore", () => {
  const _repo = Container.get(UsersService);
  //

  const state = reactive<UsersState>({
    content: {
      pageContent: [],
      numberOfPages: 1,
      pageSize: 0,
      pageNumber: 0,
    },
    contentState: new CoreContentState(),
    filterOptions: { ...DefaultQueryParams, search: "" },
  });

  const getUsers = async (request = DefaultFetchUsersRequestDto) => {
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

  const changeStatus = async (id: string) => {
    try {
      state.contentState.status = CoreContentStatus.loading;
      await _repo.changeStatus(id);
      state.contentState.status = CoreContentStatus.success;
    } catch (error: any) {
      state.contentState.status = CoreContentStatus.failure;
      state.contentState.message = error.data?.message;
      throw error;
    }
  }

  const updateFilterOptions = (newOptions: FetchUsersRequestDto) => {
    state.filterOptions = { ...state.filterOptions, ...newOptions };
  };

  watch(
    () => state.filterOptions,
    (newVal) => {
      getUsers(newVal);
    }
  );

  return {
    content: computed(() => state.content),
    contentState: computed(() => state.contentState),
    filterOptions: ref(state.filterOptions),
    updateFilterOptions,
    fetchById,
    getUsers,
    changeStatus
  } as const;
});
