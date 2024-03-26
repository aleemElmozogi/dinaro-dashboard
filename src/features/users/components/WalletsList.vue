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
              {{ item.walletType.name }}
            </TableCell>
            <TableCell> {{ item.balance }} </TableCell>
            <TableCell> {{ item.createdAt }} </TableCell>
            <TableCell> {{ item.updatedAt }} </TableCell>
            <TableCell class="flex items-center gap-3">
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <button variant="link">
                    <span>سحب</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle> سحب قيمة من المحفظة </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    <input
                      name="balance"
                      type="number"
                      placeholder="القيمة"
                      class="input"
                      v-model.number="value"
                    />
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>الغاء</AlertDialogCancel>
                    <AlertDialogAction
                      @click="
                        () => {
                          // controller.withdraw();
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
import { ref } from "yup";

const controller = useUsers();

const value = ref<number>(0);

defineProps<{
  wallets: UserWalletDto[];
}>();
</script>
