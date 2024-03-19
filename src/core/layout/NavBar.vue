<template>
  <nav class="px-4 shadow header bg-background">
    <div
        class="flex items-center justify-between px-12 py-3 mx-auto lg:justify-end"
    >
      <button class="lg:hidden" @click="$emit('toggleSidebar')">
        <i class="text-3xl bx bx-menu text-primary"></i>
      </button>

      <div class="flex items-center gap-4">
        

        <DropdownMenu v-if="auth.user" dir="rtl">
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage :src="''" alt="@radix-vue"/>
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger
          >
          <DropdownMenuContent dir="rtl">
            <DropdownMenuLabel>الاعدادات</DropdownMenuLabel>
            <DropdownMenuSeparator/>


            <DropdownMenuItem
                @click="auth.logout"
                class="flex items-center gap-2"
            >
              <i class="bx bx-exit"></i>
              <span>  تسجيل الخروج </span></DropdownMenuItem
            >
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


    </div>
  </nav>
</template>
<script lang="ts" setup>
import {useAuth} from "@/features/Auth/controllers/auth.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/core/components/ui/dropdown-menu";
import {
  Avatar, AvatarFallback, AvatarImage
} from "@/core/components/ui/avatar";
import {Theme} from "@/core/constant/Theme.ts";

const auth = useAuth();


const setTheme = (theme: Theme) => {
  localStorage.theme = theme

  if (theme === Theme.DARK) {
    document.documentElement.classList.add(Theme.DARK)
  } else {
    document.documentElement.classList.remove(Theme.DARK)
  }
}


</script>
