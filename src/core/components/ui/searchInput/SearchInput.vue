<template>
  <div class="flex items-center xl:w-[360px] ">
    <input
      type="search"
      v-model="Search"
      @keyup.enter="onSearch"
      placeholder="بحث..."
      class="w-full px-4 py-3 bg-gray-100 border-none rounded-r-lg focus:outline-none focus:border-primary"
    />

    <button
      type="button"
      @click="onSearch"
      class="flex items-center justify-center px-4 py-3 rounded-l-lg bg-primary focus:outline-none focus:border-primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23.994"
        height="24"
        viewBox="0 0 23.994 24"
      >
        <path
          id="Icon_ionic-ios-search"
          data-name="Icon ionic-ios-search"
          d="M28.213,26.756,21.539,20.02A9.51,9.51,0,1,0,20.1,21.482l6.63,6.692a1.027,1.027,0,0,0,1.45.037A1.034,1.034,0,0,0,28.213,26.756ZM14.066,21.564a7.509,7.509,0,1,1,5.311-2.2A7.463,7.463,0,0,1,14.066,21.564Z"
          transform="translate(-4.5 -4.493)"
          fill="#fff"
        />
      </svg>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const Search = ref("");


onMounted(() => {
  if (router.currentRoute.value.query["search"]) {
    Search.value = router.currentRoute.value.query["search"] as string;
  }
});


watch(
  () => router.currentRoute.value.query,
  (query) => {
    if (query["search"]) {
      Search.value = query["search"] as string;
    }
  }
);

const onSearch = () => {
  const prev_query = router.currentRoute.value.query;
  const query = Object.assign({}, prev_query);
  query["search"] = Search.value;
  router.push({ query });
};
</script>
