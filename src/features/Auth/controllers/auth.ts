import { defineStore } from "pinia";
import { ref } from "vue";
import AuthService, {
  UserActivateState,
} from "@/features/Auth/services/auth.ts";
import { LoginRequestDTO } from "@/features/Auth/models/LoginRequestDTO.ts";
import { UserData } from "@/features/Auth/models/UserData.ts";
import { Container } from "typedi";
import { jwtDecode } from "@/core/helpers/jwtDecode";
import { CheckActiveTokenRequestDto } from "../models/CheckActiveTokenRequestDto";
import { ResetPasswordRequestDto } from "../models/ResetPasswordRequestDto";
import { useRouter } from "vue-router";
import { ERoutesName } from "@/core/constant/ERoutesName";
import { useToast } from "vue-toastification";

export const useAuth = defineStore("AuthStore", () => {
  const router = useRouter();
  const toast = useToast();
  const _repo = Container.get(AuthService);
  //
  const user = ref<UserData | null>();
  const is_loading = ref(false);

  const login = async (credentials: LoginRequestDTO) => {
    try {
      is_loading.value = true;
      const response = await _repo.login(credentials);
      const token = response.data.content;
      const data = jwtDecode(token);
      localStorage.setItem("token", token);
      user.value = data;
      return data;
    } catch (e) {
      throw e;
    } finally {
      is_loading.value = false;
    }
  };

  const getProfile = async () => {
    is_loading.value = true;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const data = jwtDecode(token);
      user.value = data;
    } catch (e) {
    } finally {
      is_loading.value = false;
    }
  };

  const logout = async () => {
    localStorage.clear();
    location.href = "/auth/login";
  };

  const checkActivation = async (request: CheckActiveTokenRequestDto) => {
    try {
      is_loading.value = true;
      const response = await _repo.checkActiveToken(request);
      switch (response.data.content) {
        case UserActivateState.AbleToActivate:
          break;
        case UserActivateState.FailToFind:
          toast.error("faild to find user. please try again.");
          router.push({
            name: ERoutesName.LOGIN,
          });
          break;
        case UserActivateState.Activated:
          router.push({
            name: ERoutesName.LOGIN,
          });
          break;
      }
      return response.data;
    } catch (e) {
      throw e;
    } finally {
      is_loading.value = false;
    }
  };

  const activateNewPassword = async (request: ResetPasswordRequestDto) => {
    try {
      is_loading.value = true;
      const response = await _repo.activateNewPassword(request);
      return response.data;
    } catch (e) {
      throw e;
    } finally {
      is_loading.value = false;
    }
  };

  return {
    user,
    login,
    logout,
    getProfile,
    is_loading,
    checkActivation,
    activateNewPassword,
  } as const;
});
