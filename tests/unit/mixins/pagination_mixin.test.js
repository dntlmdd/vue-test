import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

import PaginationMixin from '@/mixins/PaginationMixin';

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const createWrapper = (query = {}) => {
  const Component = {
    mixins: [PaginationMixin],
    template: '<div />',
  };

  return shallowMount(Component, {
    localVue,
    router,
  });
};


describe('PaginationMixin page getter', () => {
  it('Should return number value', () => {
    const wrapper = createWrapper();

    wrapper.vm.$route.query.page = '10';

    expect(wrapper.vm.page).toEqual(10);
  });

  it('Should return first page if page is not defined', () => {
    const wrapper = createWrapper();

    expect(wrapper.vm.page).toEqual(10);;
  });
});

describe('PaginationMixin page setter', () => {
  it('Should set value to router', () => {
    const wrapper = createWrapper();

    wrapper.vm.page = 10;

    expect(wrapper.vm.$route.query.page).toEqual('10');
  });

  it('Should removes page from route when page is 1', () => {
    const wrapper = createWrapper();

    wrapper.vm.page = 1;

    expect('page' in wrapper.vm.$route.query).toBe(false);
  });
});
