import React from 'react';
import { shallow } from 'enzyme';
import WalletError from './WalletError';

describe('Wallet Error', () => {
  describe('#render', () => {
    it('should return error message when called', () => {
      const errorMessage = 'Network error';
      const wrapper = shallow(<WalletError message={errorMessage} />);

      expect(wrapper.find('p').text()).toEqual(errorMessage);
    });
  });
});
