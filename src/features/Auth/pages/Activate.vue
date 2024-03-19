<template>
  <div>
    <SkeltonLoading v-if="auth.is_loading" />

    <Form v-else @submit="submit" :validation-schema="activateAccountSchema">
      <h1 class="text-xl font-medium text-center">Activate your account</h1>

      <div class="my-5">
        <label for="pin">New Password</label>
        <Field
          name="pin"
          id="pin"
          autocomplete
          type="password"
          placeholder="password"
          class="input"
          v-model="state.newPin"
        />
        <ErrorMessage class="error-message" name="pin" />
      </div>

      <div class="my-5" v-if="errorMessage">
        <Alert variant="destructive" class="font-bold bg">
          {{ errorMessage }}
        </Alert>
      </div>

      <Button type="submit" class="w-full" :disabled="auth.is_loading">
        <Loading v-if="auth.is_loading" />
        <span v-else> Activate </span>
      </Button>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { activateAccountSchema } from "../validation";
import { Button } from "@/core/components/ui/button";
import Alert from "@/core/components/ui/alert/Alert.vue";
import { useAuth } from "@/features/Auth/controllers/auth.ts";
import { ERoutesName } from "@/core/constant/ERoutesName.ts";
import Loading from "@/core/components/ui/loading/Loading.vue";
import { AxiosResponse } from "axios";
import CoreResponseDto from "@/core/constant/ICoreResponseDto";
import SkeltonLoading from "@/core/components/ui/container/SkeltonLoading.vue";
import { useToast } from "vue-toastification";

const auth = useAuth();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const state = reactive({
  email: "",
  code: "",
  newPin: "",
});

onMounted(() => {
  if (!route.query.email && !route.query.code) {
    toast.error("Invalid activation link");
    router.push({ name: ERoutesName.LOGIN });
  }
  state.email = route.query.email as string;
  state.code = route.query.code as string;
  auth.checkActivation({ email: state.email, code: state.code });
});

const errorMessage = ref("");

const submit = async () => {
  try {
    await auth.activateNewPassword({
      ...state,
    });
    toast.success("Account activated successfully");
    router.push({ name: ERoutesName.MAIN });
  } catch (error: unknown) {
    errorMessage.value = (
      error as AxiosResponse<CoreResponseDto<undefined>>
    ).data?.messages[0];
  }
};
</script>
