import React from 'react';
import { shallow } from 'enzyme';
import TransactionError from './TransactionError';

describe('Transaction Error', () => {
  describe('#render', () => {
    it('should return error message when called', () => {
      const errorMessage = 'Network error';
      const wrapper = shallow(<TransactionError message={errorMessage} />);

      expect(wrapper.find('p').text()).toEqual(errorMessage);
    });
  });
});
