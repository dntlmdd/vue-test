<template>
  <div class="users">
    <AppLoader v-if="isLoading" />
    <template v-else>
      <UsersTable class="users__table" :users="users" />
      <AppPagination class="users__pagination" v-model="page" :per-page="perPage" :total="totalUsers" />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UsersTable from '@/components/UsersTable';
import AppPagination from '@/components/AppPagination';
import PaginationMixin from '@/mixins/PaginationMixin';
import AppLoader from '@/components/AppLoader';

export default {
  mixins: [PaginationMixin],
  components: {
    UsersTable,
    AppPagination,
    AppLoader,
  },
  data() {
    return {
      isLoading: false,
      perPage: 2,
    };
  },
  computed: {
    ...mapState('users', ['users', 'totalUsers']),
  },
  watch: {
    page: {
      immediate: true,
      async handler(val) {
        try {
          this.isLoading = true;
          await this.FETCH_USERS({ _page: val, _limit: this.perPage });
        } catch (e) {
          // fuck it
        } finally {
          this.isLoading = false;
        }
      },
    },
  },
  methods: {
    ...mapActions('users', ['FETCH_USERS']),
  },
};
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__table {
    margin-top: 50px;
  }

  &__pagination {
    margin-top: 20px;
  }
}
</style>
