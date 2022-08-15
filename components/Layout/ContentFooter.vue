<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by
        Marco Osvaldo Rivas Romo
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
