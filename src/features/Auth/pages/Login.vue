<template>
  <Form @submit="submit" :validation-schema="loginSchema">
    <h1 class="text-xl font-medium text-center">Login to your account</h1>

    <div class="my-5">
      <label for="email">البريد الالكتروني</label>
      <Field
        name="email"
        id="email"
        type="email"
        placeholder="email"
        class="input"
        v-model="state.email"
      />
      <ErrorMessage class="error-message" name="email" />
    </div>

    <div class="my-5">
      <label for="password">كلمة المرور</label>
      <Field
        name="password"
        id="password"
        autocomplete
        type="password"
        placeholder="password"
        class="input"
        v-model="state.password"
      />
      <ErrorMessage class="error-message" name="pin" />
    </div>

    <div class="my-5" v-if="errorMessage">
      <Alert variant="destructive" class="font-bold bg">
        {{ errorMessage }}
      </Alert>
    </div>

    <Button
      type="submit"
      class="w-full text-white bg-primary"
      :disabled="auth.is_loading"
    >
      <Loading v-if="auth.is_loading" />
      <span v-else> تسجيل الدخول </span>
    </Button>
  </Form>
</template>
<script setup lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { loginSchema } from "../validation";
import { Button } from "@/core/components/ui/button";
import Alert from "@/core/components/ui/alert/Alert.vue";
import { useAuth } from "@/features/Auth/controllers/auth.ts";
import { ERoutesName } from "@/core/constant/ERoutesName.ts";
import Loading from "@/core/components/ui/loading/Loading.vue";
import { AxiosResponse } from "axios";
import CoreResponseDto from "@/core/constant/ICoreResponseDto";

const auth = useAuth();
const router = useRouter();

const state = reactive({
  email: "admin@gmail.com",
  password: "password",
});

const errorMessage = ref("");

const submit = async (args: any) => {
  try {
    await auth.login(args);
    router.push({ name: ERoutesName.MAIN });
  } catch (error: unknown) {
    errorMessage.value = (
      error as AxiosResponse<CoreResponseDto<undefined>>
    ).data?.message;
  }
};
</script>
