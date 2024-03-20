<template>
  <ModuleHeader title="ادارة المستخدمين" sub_title="قائمة المستخدمين" />

  <Container :coreContentstate="controller.contentState">
    <template v-slot:content>
      <div>
        <Filter />

        <Table>
          <TableCaption>قائمة المستخدمين </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>avatar</TableHead>
              <TableHead>name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>phone</TableHead>
              <TableHead>is Active</TableHead>
              <TableHead>-</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="item in controller.content.pageContent"
              :key="item.id"
            >
              <TableCell>
                <Avatar>
                  <AvatarImage :src="item.avatar || ''" :alt="item.name" />
                  <AvatarFallback>{{ item.name }}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell> {{ item.name }} </TableCell>
              <TableCell> {{ item.email }} </TableCell>
              <TableCell> {{ item.phone }} </TableCell>
              <TableCell>
                <Badge>
                  {{ item.isActive ? "تعم" : "لا" }}
                </Badge>
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
          :default-page="controller.content.pageNumber"
        >
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

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
                    () => (controller.filterOptions.pageNumber = item.value)
                  "
                  :variant="item.value === page ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
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
import Badge from "@/core/components/ui/badge/Badge.vue";
import NoContent from "@/core/components/ui/NoContent.vue";
import AvatarImage from "@/core/components/ui/avatar/AvatarImage.vue";
import Avatar from "@/core/components/ui/avatar/Avatar.vue";
import AvatarFallback from "@/core/components/ui/avatar/AvatarFallback.vue";
import { useUsers } from "../controllers/usersController";

const controller = useUsers();

onMounted(() => {
  controller.getUsers();
});
</script>

<style scoped></style>
