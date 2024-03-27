<template>
  <ModuleHeader title="ادارة المستخدمين" sub_title="عرض المستخدم" />
  <Container :coreContentstate="controller.contentState">
    <template #content>
      <Tabs
        v-if="user"
        default-value="userData"
        dir="rtl"
        class="my-8 col-span-full"
      >
        <TabsList class="grid w-full grid-cols-5">
          <TabsTrigger value="userData"> بيانات المسيتخدم </TabsTrigger>
          <TabsTrigger value="friendsList">قائمة الاصدقاء </TabsTrigger>
          <TabsTrigger value="walletsList"> قائمة المحافظ </TabsTrigger>
        </TabsList>
        <TabsContent value="userData">
          <UserDataView :user="user" />
        </TabsContent>
        <TabsContent value="friendsList">
          <FriendsList :friendsList="user.friends" />
        </TabsContent>
        <TabsContent value="walletsList">
          <WalletsList :wallets="user.wallets" />
        </TabsContent>
      </Tabs>

      <no-content v-else></no-content>
    </template>
  </Container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import NoContent from "@/core/components/ui/NoContent.vue";
import Container from "@/core/components/ui/container/Container.vue";
import ModuleHeader from "@/core/components/ui/header/ModuleHeader.vue";
import { useUsers } from "../controllers/usersController";
import { FetchUserDetailsResponseDto } from "../models/fetchUsersDto";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import UserDataView from "../components/UserDataView.vue";
import FriendsList from "../components/FriendsList.vue";
import WalletsList from "../components/WalletsList.vue";

const controller = useUsers();

const route = useRoute();
const user = ref<FetchUserDetailsResponseDto>();

onMounted(() => {
  controller.fetchById(route.params.id as string).then((res) => {
    user.value = res;
  });
});
</script>
