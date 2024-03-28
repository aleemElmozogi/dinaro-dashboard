<template>
  <ModuleHeader title="لوحة التحكم" sub_title="الاحصائيات" />
  <Container>
    <template v-slot:content>
      <Statis />

      <div class="mt-24">
        <div>
          <p class="my-2 text-2xl font-medium text-gray-800">طلبات السحب</p>
          <Table>
            <TableCaption>قائمة اخر الطلبات</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead> المبلغ </TableHead>
                <TableHead> الرسوم </TableHead>
                <TableHead> تاريخ العملية </TableHead>
                <TableHead>-</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(item, index) in transactionController
                  .withdrawRequestContent.pageContent"
                :key="index"
              >
                <TableCell>
                  {{ item.title || "-" }}
                </TableCell>
                <TableCell>
                  {{ item.amount.toFixed(2) }}
                </TableCell>
                <TableCell>
                  {{ item.fee.toFixed(2) }}
                </TableCell>
                <TableCell>
                  {{ new Date(item.transactionDate).toLocaleDateString() }}
                </TableCell>

                <TableCell class="flex items-center gap-4">
                  <AlertDialog>
                    <AlertDialogTrigger as-child>
                      <Button class="bg-red-500"> رفض </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          تغيير حالة العملية
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription>
                        هل انت متاكد من رفض العملية
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>الغاء</AlertDialogCancel>
                        <AlertDialogAction
                          @click="
                            () =>
                              transactionController
                                .rejectWithdrawRequest(item.id)
                                .then(() =>
                                  transactionController.getWithdrawRequest()
                                )
                          "
                        >
                          تأكيد
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger as-child>
                      <Button class="bg-green-500"> موافقة </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          تغيير حالة العملية
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription>
                        هل انت متاكد من تأكيد العملية
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>الغاء</AlertDialogCancel>
                        <AlertDialogAction
                          @click="
                            () =>
                              transactionController
                                .approveWithdrawRequest(item.id)
                                .then(() =>
                                  transactionController.getWithdrawRequest()
                                )
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
          <NoContent
            v-if="
              !transactionController.withdrawRequestContent.pageContent.length
            "
          />
          <router-link
            class="block text-center text-blue-500"
            :to="{
              name: ERoutesName.TRANSACTIONS_INDEX,
              query: {
                type: ETransactionType.Withdraw,
                state: TransactionState.Pending,
              },
            }"
          >
            عرض الكل
          </router-link>
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
import { onMounted } from "vue";
import { useTransactions } from "../../transactions/controllers/transactionsController";
import Button from "@/core/components/ui/button/Button.vue";
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
import { ERoutesName } from "@/core/constant/ERoutesName";
import { ETransactionType } from "@/core/constant/ETransactionType";
import { TransactionState } from "../../../core/constant/ETransactionState";

const controller = useDashboard();
const transactionController = useTransactions();

onMounted(() => {
  controller.getStats();
  transactionController.getWithdrawRequest({
    page: 1,
    pageSize: 5,
  });
});
</script>

<style scoped></style>
