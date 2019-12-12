import React from 'react';
import { shallow } from 'enzyme';
import TransactionSort from './TransactionSort';

describe('TransactionSort', () => {
  let wrapper;
  let handleSort;
  beforeEach(() => {
    handleSort = jest.fn();
    wrapper = shallow(<TransactionSort
      onSort={handleSort}
    />);
  });
  describe('#render', () => {
    it('should call handleSort with selected sort', () => {
      const keyword = '_sort=createdAt&_order=desc';
      wrapper.find('#sort-select').simulate('change', { target: { name: 'sort', value: keyword } });

      expect(handleSort).toHaveBeenCalledWith(keyword);
    });
  });
});
