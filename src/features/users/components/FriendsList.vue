<template>
  <div class="mt-8 col-span-full">
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
          <TableRow v-for="item in friendsList" :key="item.id">
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
        v-if="friendsList.length === 0"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import NoContent from "@/core/components/ui/NoContent.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { FetchUsersResponseDto } from "../models/fetchUsersDto";
import { ERoutesName } from "@/core/constant/ERoutesName";
import Button from "@/core/components/ui/button/Button.vue";

defineProps<{
  friendsList: FetchUsersResponseDto[];
}>();
</script>
