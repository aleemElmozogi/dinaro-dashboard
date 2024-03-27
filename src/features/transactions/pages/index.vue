<template>
  <ModuleHeader title="ادارة المعاملات" sub_title="قائمة المعاملات" />

  <Container :coreContentstate="controller.contentState">
    <template v-slot:content>
      <Table>
        <TableCaption>قائمة المعاملات</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>اسم المرسل </TableHead>
            <TableHead>اسم المستلم</TableHead>
            <TableHead> القيمة </TableHead>
            <TableHead> العمولة </TableHead>
            <TableHead> الحالة </TableHead>
            <TableHead> النوع </TableHead>
            <TableHead> تاريخ الانشاء </TableHead>
            <TableHead>-</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="item in controller.content.pageContent"
            :key="item.id"
          >
            <TableCell>
              {{ item.senderName }}
            </TableCell>
            <TableCell>
              {{ item.receiverName }}
            </TableCell>
            <TableCell> {{ item.amount }} </TableCell>
            <TableCell>
              {{ item.fee }}
            </TableCell>
            <TableCell>
              {{ item.status }}
            </TableCell>
            <TableCell>
              {{ item.type }}
            </TableCell>
            <TableCell>
              {{ new Date(item.createdAt).toLocaleDateString() }}
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
import { onMounted } from "vue";
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
import { useTransactions } from "../controllers/transactionsController";

const controller = useTransactions();

onMounted(() => {
  controller.getTransactions();
});
</script>

<style scoped></style>
