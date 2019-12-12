import React from 'react';
import { shallow } from 'enzyme';
import TransactionSearch from './TransactionSearch';

describe('TransactionSearch', () => {
  let wrapper;
  let handleSearch;
  beforeEach(() => {
    handleSearch = jest.fn();
    wrapper = shallow(<TransactionSearch
      onSearch={handleSearch}
    />);
  });
  describe('#render', () => {
    it('should call handleSearch with search keyword', () => {
      const keyword = 'Payslip';
      wrapper.find('#search-input').simulate('change', { target: { name: 'search', value: keyword } });

      expect(handleSearch).toHaveBeenCalledWith(keyword);
    });
  });
});
