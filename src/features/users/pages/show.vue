<template>
  <ModuleHeader title="ادارة المستخدمين" sub_title="عرض المستخدم" />
  <Container :coreContentstate="controller.contentState">
    <template #content>
      <Tabs
        v-if="user"
        default-value="customer"
        dir="rtl"
        class="my-8 col-span-full"
      >
        <TabsList class="grid w-full grid-cols-5">
          <TabsTrigger value="userData"> بيانات المسيتخدم </TabsTrigger>
          <TabsTrigger value="friendsList">قائمة الاصدقاء </TabsTrigger>
          <TabsTrigger value="walletsList"> قائمة المحافظ </TabsTrigger>
          <TabsTrigger value="transactionsList"> قائمة الحوالات </TabsTrigger>
        </TabsList>
        <TabsContent value="userData">
          <div
            class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <Labeled label="الاسم الاول" :value="user.firstName" />
            <Labeled label="الاسم التاني" :value="user.lastName" />
            <Labeled label="البريد الالكتروني" :value="user.email" />
            <Labeled label="رقم الهاتف" :value="user.phoneNumber" />
            <Labeled label="العنوان" :value="user.address" />
            <Labeled label="تاريخ الميلاد" :value="user.dateOfBirthString" />
            <Labeled
              label="عدد الاصدقاء"
              :value="user.numberOfFriends.toString()"
            />
            <Labeled
              label="عدد المحافظ"
              :value="user.numberOfWallets.toString()"
            />
            <Labeled label="تاريخ التسجيل" :value="user.createdAtString" />
          </div>
        </TabsContent>
        <TabsContent value="friendsList">
          <div class="mt-8 col-span-full">
            <label class="text-base font-normal">الاصدقاء</label>
            <div>
              <Table>
                <TableCaption>قائمة الاصدقاء</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الالكتروني</TableHead>
                    <TableHead>رقم الهاتف</TableHead>
                    <TableHead>-</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="item in user.friends" :key="item.id">
                    <TableCell>
                      {{ item.fullName }}
                    </TableCell>
                    <TableCell> {{ item.email }} </TableCell>
                    <TableCell> {{ item.phoneNumber }} </TableCell>
                    <TableCell class="flex items-center gap-3">
                      <Button
                        @click="
                          () =>
                            $router.push({
                              name: ERoutesName.USERS_SHOW,
                              params: { id: item.id },
                            })
                        "
                        >عرض المستخدم</Button
                      >
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <NoContent
                message="قائمة الاصدقاء فارغة"
                v-if="user.firstName.length === 0"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="walletsList"></TabsContent>
        <TabsContent value="transactionsList"></TabsContent>
      </Tabs>

      <no-content v-else></no-content>
    </template>
  </Container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import NoContent from "@/core/components/ui/NoContent.vue";
import Labeled from "@/core/components/ui/labeled/Labeled.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import Container from "@/core/components/ui/container/Container.vue";
import ModuleHeader from "@/core/components/ui/header/ModuleHeader.vue";
import { useUsers } from "../controllers/usersController";
import { FetchUserDetailsResponseDto } from "../models/fetchUsersDto";
import { ERoutesName } from "@/core/constant/ERoutesName";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs";

const controller = useUsers();

const route = useRoute();
const user = ref<FetchUserDetailsResponseDto>();

onMounted(() => {
  controller.fetchById(+(route.params.id as string)).then((res) => {
    user.value = res;
  });
});
</script>
