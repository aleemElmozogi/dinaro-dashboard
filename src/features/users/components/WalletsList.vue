<template>
  <div class="mt-8 col-span-full">
    <div>
      <Table>
        <TableCaption>قائمة المحافظ</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>نوع المحفظة</TableHead>
            <TableHead> الرصيد </TableHead>
            <TableHead> تاريخ الانشاء </TableHead>
            <TableHead> تاريخ التحديث </TableHead>
            <TableHead>-</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in wallets" :key="item.id">
            <TableCell>
              {{ item.walletTypeName }}
            </TableCell>
            <TableCell> {{ item.balance }} </TableCell>
            <TableCell> {{ item.createdAt }} </TableCell>
            <TableCell> {{ item.updatedAt }} </TableCell>
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
                      v-model.number="value"
                    />
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>الغاء</AlertDialogCancel>
                    <AlertDialogAction
                      @click="
                        () => {
                          controller.deposit(item.id, value).then(() => {
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

      <NoContent message="قائمة المحافظ فارغة" v-if="wallets.length === 0" />
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
import { UserWalletDto } from "../models/fetchUsersDto";
import Button from "@/core/components/ui/button/Button.vue";
import { useUsers } from "../controllers/usersController";
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
import { ref } from "vue";

const controller = useUsers();

const value = ref<number>(0);

defineProps<{
  wallets: UserWalletDto[];
}>();
</script>
