<template>
  <h2>{{ $route.meta.title }}</h2>
</template>

<script>
export default {
  middleware: ["authenticated"],
  mounted() {
    $nuxt.$router.push({
      path: "/dashboard",
    });
  },
};
</script>
