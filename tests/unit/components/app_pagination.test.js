import { shallowMount } from '@vue/test-utils';
import each from 'jest-each';

import AppPagination from '@/components/AppPagination';

const createWrapper = (propsData = {}, computed = {}) => shallowMount(AppPagination, {
  propsData: {
    total: 50,
    value: 1,
    perPage: 10,
    ...propsData,
  },
  computed,
});

describe('nextPage computed', () => {
  each([
    [1, 2],
    [3, 4],
    [50, null],
    [55, null],
  ]).test('Should return next page. When current is %s expected nextPage to be %s', (value, expected) => {
    const wrapper = createWrapper({ value });

    expect(wrapper.vm.nextPage).toEqual(expected);
  });

  it('Should return null when last page is null', () => {
    const wrapper = createWrapper({}, {
      lastPage: () => null,
    });

    expect(wrapper.vm.nextPage).toEqual(null);
  });
});

describe('prevPage computed', () => {
  each([
    [0, null],
    [1, null],
    [2, 1],
    [25, 24],
  ]).test('Should return previous page. When current is %s expected prevPage to be %s', (value, expected) => {
    const wrapper = createWrapper({ value });

    expect(wrapper.vm.prevPage).toEqual(expected);
  });
});

describe('lastPage computed', () => {
  each([
    [50, 50, null],
    [50, 100, null],
    [50, 10, 5],
    [8, 3, 3],
    [8, 6, 2],
  ]).test('Should last page. When total is %s, perPage %s, expected lastPage to be %s', (total, perPage, expected) => {
    const wrapper = createWrapper({ total, perPage });

    expect(wrapper.vm.lastPage).toEqual(expected);
  });

  it('Should return null when current is last', () => {
    const wrapper = createWrapper({
      value: 20,
      perPage: 5,
      total: 100,
    });

    expect(wrapper.vm.lastPage).toEqual(null);
  });
});

describe('shouldRender', () => {
  each([
    [0, 10, false],
    [5, 10, false],
    [10, 10, false],
    [11, 10, true],
  ]).test('Should render pagination. total %s, perPage %s, should rendered %s', (total, perPage, expected) => {
    const wrapper = createWrapper({ total, perPage });

    expect(wrapper.vm.shouldRender).toBe(expected);
  });
});

describe('Should not render pagionation', () => {
  each([
    false,
    true,
  ]).test('Should render component %s', (shouldRender) => {
    const wrapper = createWrapper({}, {
      shouldRender: () => shouldRender,
    });

    expect(wrapper.isVisible()).toBe(shouldRender);
  });
});

describe('Renders navigation', () => {
  each([
    [1, false],
    [2, true],
  ]).test('Should render first page element if currernt is %s should render is %s', (value, expected) => {
    const wrapper = createWrapper({ value });

    expect(wrapper.find('.pagination__item.pagination__item--first').exists()).toBe(expected);
  });

  each([
    [null, false],
    [2, true],
  ]).test('Should render previous page element if prevPage is %s should render is %s', (prevPage, expected) => {
    const wrapper = createWrapper({}, {
      prevPage: () => prevPage,
    });

    expect(wrapper.find('.pagination__item.pagination__item--prev').exists()).toBe(expected);
  });

  each([
    [null, false],
    [2, true],
  ]).test('Should render next page element if nextPage is %s should render is %s', (nextPage, expected) => {
    const wrapper = createWrapper({}, {
      nextPage: () => nextPage,
    });

    expect(wrapper.find('.pagination__item.pagination__item--next').exists()).toBe(expected);
  });

  each([
    [null, false],
    [2, true],
  ]).test('Should render last page element if lastPage is %s should render is %s', (lastPage, expected) => {
    const wrapper = createWrapper({}, {
      lastPage: () => lastPage,
    });

    expect(wrapper.find('.pagination__item.pagination__item--last').exists()).toBe(expected);
  });
});

describe('Renders correct values', () => {
  it('Should render first page correctly', () => {
    const wrapper = createWrapper({}, {
      prevPage: () => 5,
    });

    expect(wrapper.find('.pagination__item.pagination__item--first').text()).toEqual('1');
  });

  it('Should render prev page correctly', () => {
    const wrapper = createWrapper({}, {
      prevPage: () => 5,
    });

    expect(wrapper.find('.pagination__item.pagination__item--prev').text()).toEqual('<');
  });

  each([
    5,
    10,
  ]).test('Should current page correctly, with value %s current page should be %s', (value) => {
    const wrapper = createWrapper({ value });

    expect(wrapper.find('.pagination__item.pagination__item--current').text()).toEqual(String(value));
  });

  it('Should render next page correctly', () => {
    const wrapper = createWrapper({}, {
      nextPage: () => 5,
    });

    expect(wrapper.find('.pagination__item.pagination__item--next').text()).toEqual('>');
  });

  it('Should render last page correctly', () => {
    const wrapper = createWrapper({}, {
      lastPage: () => 5,
    });

    expect(wrapper.find('.pagination__item.pagination__item--last').text()).toEqual('5');
  });
});

describe('Should send correct value', () => {
  it('Should emit 1 when clicked on first page', () => {
    const wrapper = createWrapper({}, {
      prevPage: () => 5,
    });

    wrapper
      .find('.pagination__item.pagination__item--first')
      .trigger('click');

    expect(wrapper.emitted('input')).toEqual([[1]]);
  });

  it('Should emit correct value when clicked on prev page', () => {
    const wrapper = createWrapper({}, {
      prevPage: () => 2,
    });

    wrapper
      .find('.pagination__item.pagination__item--prev')
      .trigger('click');

    expect(wrapper.emitted('input')).toEqual([[2]]);
  });

  it('Should emit nothing when click on correct', () => {
    const wrapper = createWrapper({ value: 4 });

    wrapper
      .find('.pagination__item.pagination__item--current')
      .trigger('click');

    expect(wrapper.emitted('input')).toBeUndefined();
  });

  it('Should emit correct value when clicked on prev page', () => {
    const wrapper = createWrapper({}, {
      nextPage: () => 25,
    });

    wrapper
      .find('.pagination__item.pagination__item--next')
      .trigger('click');

    expect(wrapper.emitted('input')).toEqual([[25]]);
  });

  it('Should emit correct value when clicked on last page', () => {
    const wrapper = createWrapper({}, {
      lastPage: () => 50,
    });

    wrapper
      .find('.pagination__item.pagination__item--last')
      .trigger('click');

    expect(wrapper.emitted('input')).toEqual([[50]]);
  });
});
