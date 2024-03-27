<template>
  <ModuleHeader title="ادارة المحافظ" sub_title="قائمة المحافظ" />

  <Container :coreContentstate="controller.contentState">
    <template v-slot:content>
      <Table>
        <TableCaption>قائمة المحافظ</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>نوع المحفظة</TableHead>
            <TableHead>اسم صاحب المحفظة</TableHead>
            <TableHead> الرصيد </TableHead>
            <TableHead> تاريخ الانشاء </TableHead>
            <TableHead> تاريخ التحديث </TableHead>
            <TableHead>-</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="item in controller.content.pageContent"
            :key="item.id"
          >
            <TableCell>
              {{ item.walletType }}
            </TableCell>
            <TableCell>
              <router-link
                class="hover:underline"
                :to="{
                  name: ERoutesName.USERS_SHOW,
                  params: { id: item.userId },
                }"
              >
                {{ item.userName }}
              </router-link>
            </TableCell>
            <TableCell> {{ item.balance }} </TableCell>
            <TableCell> {{ new Date(item.createdAt).toLocaleDateString() }} </TableCell>
            <TableCell> {{ new Date(item.updatedAt).toLocaleDateString() }} </TableCell>
            <TableCell class="flex items-center gap-3">
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button variant="link">
                    <span>شحن المحفظة</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      عملية شحن المحفظة المحفظة
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    <input
                      name="balance"
                      type="number"
                      placeholder="ادخل القيمة"
                      class="input"
                      v-model.number="chargeAmount"
                    />
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>الغاء</AlertDialogCancel>
                    <AlertDialogAction
                      @click="
                        () => {
                          controller.charge(item.id, chargeAmount).then(() => {
                            controller.fetchById($route.params.id as string);
                          });
                        }
                      "
                    >
                      تأكيد
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <NoContent v-if="controller.content.pageContent.length === 0" />

      <Pagination
        v-slot="{ page }"
        :total="controller.content.numberOfPages * controller.content.pageSize"
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
import { onMounted, ref } from "vue";
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
import { useWallets } from "../controllers/walletController";
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
import { ERoutesName } from "../../../core/constant/ERoutesName";

const controller = useWallets();
const chargeAmount = ref<number>(0);

onMounted(() => {
  controller.getWallets();
});
</script>

<style scoped></style>
