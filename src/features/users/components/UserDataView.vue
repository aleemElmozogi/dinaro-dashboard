<template>
  <div>
    <div class="flex items-center justify-end">
      <Badge
        class="cursor-pointer"
        @click="() => controller.changeStatus(user.id).then(() => controller.fetchById($route.params.id as string))"
        :class="
          user.status == 1
            ? 'bg-green-600'
            : user.status == 2
            ? 'bg-red-600'
            : ''
        "
      >
        {{ getUserStatus(user.status) }}
      </Badge>
    </div>
    <div
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <Labeled label="الاسم الاول" :value="user.firstName" />
      <Labeled label="الاسم التاني" :value="user.lastName" />
      <Labeled label="البريد الالكتروني" :value="user.email" />
      <Labeled label="رقم الهاتف" :value="user.phoneNumber" />
      <Labeled label="العنوان" :value="user.address" />
      <Labeled label="تاريخ الميلاد" :value="user.dateOfBirthString" />
      <Labeled label="عدد الاصدقاء" :value="user.numberOfFriends.toString()" />
      <Labeled label="عدد المحافظ" :value="user.numberOfWallets.toString()" />
      <Labeled label="تاريخ التسجيل" :value="user.createdAtString" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Labeled from "@/core/components/ui/labeled/Labeled.vue";

import { FetchUsersResponseDto } from "../models/fetchUsersDto";
import { useUsers } from "../controllers/usersController";
import { getUserStatus } from "../../../core/constant/UserStatus";

const controller = useUsers();

defineProps<{
  user: FetchUsersResponseDto;
}>();
</script>
