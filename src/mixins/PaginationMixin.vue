<script>
export default {
  computed: {
    page: {
      get() {
        return Number(this.$route.query.page) || 1;
      },
      set(page) {
        const query = { ...this.$route.query };

        if (page === 1) {
          delete query.page;
        } else {
          query.page = page;
        }

        this.$router.push({ ...this.$route.query, query });
      },
    },
  },
};
</script>
