<template>
  <ModuleHeader title="ادارة المستخدمين" sub_title="قائمة المستخدمين" />

  <Container :coreContentstate="controller.contentState">
    <template v-slot:content>
      <div>
        <SearchInput />

        <Table>
          <TableCaption>قائمة المستخدمين </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم </TableHead>
              <TableHead>البريد الالكتروني</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>عدد الاصدقاء</TableHead>
              <TableHead>عدد المحافظ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>-</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="item in controller.content.pageContent"
              :key="item.id"
            >
              <TableCell> {{ item.fullName }} </TableCell>
              <TableCell> {{ item.email }} </TableCell>
              <TableCell> {{ item.phoneNumber }} </TableCell>
              <TableCell> {{ item.numberOfFriends }} </TableCell>
              <TableCell> {{ item.numberOfWallets }} </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger as-child >
                    <Badge
                      class="cursor-pointer"
                      :class="
                        item.status == 1
                          ? 'bg-green-600'
                          : item.status == 2
                          ? 'bg-red-600'
                          : ''
                      "
                    >
                      {{ getUserStatus(item.status) }}
                    </Badge>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle> تغيير حالة المستخدم </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      هل انت متاكد من تغيير حالة المستخدم
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>الغاء</AlertDialogCancel>
                      <AlertDialogAction
                        @click="
                          () =>
                            controller
                              .changeStatus(item.id)
                              .then(() => controller.getUsers())
                        "
                      >
                        تأكيد
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              <TableCell class="flex items-center gap-3">
                <Button
                  class="text-black"
                  @click="
                    () =>
                      $router.push({
                        name: ERoutesName.USERS_SHOW,
                        params: { id: item.id },
                      })
                  "
                  >عرض التفاصيل</Button
                >
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <NoContent v-if="controller.content.pageContent.length === 0" />

        <Pagination
          v-slot="{ page }"
          :total="
            controller.content.numberOfPages * controller.content.pageSize
          "
          :itemsPerPage="controller.content.pageSize"
          :sibling-count="1"
          show-edges
          dir="rtl"
          :default-page="controller.content.pageNumber"
        >
          <PaginationList
            dir="rtl"
            v-slot="{ items }"
            class="flex items-center gap-1"
          >
            <PaginationNext />
            <PaginationLast />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="w-10 h-10 p-0"
                  @click="
                    () =>
                      controller.updateFilterOptions({
                        ...controller.filterOptions,
                        page: item.value,
                      })
                  "
                  :variant="item.value === page ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationFirst />
            <PaginationPrev />
          </PaginationList>
        </Pagination>
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import Container from "@/core/components/ui/container/Container.vue";
import ModuleHeader from "@/core/components/ui/header/ModuleHeader.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { onMounted, watch } from "vue";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/core/components/ui/pagination";
import Button from "@/core/components/ui/button/Button.vue";
import NoContent from "@/core/components/ui/NoContent.vue";
import { useUsers } from "../controllers/usersController";
import { ERoutesName } from "../../../core/constant/ERoutesName";
import { getUserStatus } from "@/core/constant/UserStatus";
import Badge from "@/core/components/ui/badge/Badge.vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/core/components/ui/alert-dialog";
import SearchInput from "@/core/components/ui/searchInput/SearchInput.vue";
import { useRoute } from 'vue-router';

const controller = useUsers();
const route = useRoute();

watch(() => route.query, () => {  
  const queryParams = {
    ...controller.filterOptions,
    ...route.query,
  };
  controller.getUsers(queryParams);
});


onMounted(() => {
  const queryParams = {
    ...controller.filterOptions,
    ...route.query,
  };
  controller.getUsers(queryParams);
});
</script>

<style scoped></style>
