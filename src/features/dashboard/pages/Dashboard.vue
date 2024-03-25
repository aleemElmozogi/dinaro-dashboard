<template>
  <ModuleHeader title="لوحة التحكم" sub_title="الاحصائيات" />
  <Container>
    <template v-slot:content>
      <Statis />

      <div class="grid grid-cols-1 mt-24 md:gap-16 md:grid-cols-2">
        <div>
          <p class="my-2 text-2xl font-medium text-gray-800">طلبات السحب</p>
          <Table>
            <TableCaption>قائمة اخر الطلبات</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>تاريخ الطلب</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>-</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(item, index) in controller.content.pageContent"
                :key="index"
              >
                <TableCell> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <NoContent v-if="!controller.content.pageContent.length" />
        </div>
        <div>
          <p class="my-2 text-2xl font-medium text-gray-800">المبيعات</p>

          <Table>
            <TableCaption>قائمة اخر المبيعات</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>صورة المنتج</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الاجمالي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(item, index) in controller.content.pageContent"
                :key="index"
              >
                <TableCell> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <NoContent v-if="!controller.content.pageContent.length" />
        </div>
      </div>
    </template>
  </Container>
</template>
<script setup lang="ts">
import Container from "@/core/components/ui/container/Container.vue";
import ModuleHeader from "@/core/components/ui/header/ModuleHeader.vue";
import Statis from "../components/Statis.vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { useDashboard } from "../controllers/dashboard";
import NoContent from "@/core/components/ui/NoContent.vue";

const controller = useDashboard();
</script>

<style scoped></style>
