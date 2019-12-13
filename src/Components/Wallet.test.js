import { shallow } from 'enzyme';
import React from 'react';
import Wallet from './Wallet';

describe('Wallet', () => {
  let wrapper;
  let wallet;
  let user;
  beforeEach(() => {
    wallet = {
      id: 1,
      userId: 1,
      balance: 110000000000,
      createdAt: '2019-11-28T13:26:15.+07:00',
      updatedAt: '2019-11-28T13:26:15.+07:00'
    };
    user = {
      id: 1,
      name: 'Huda',
      email: 'huda@gmail.com',
      phoneNumber: '08213049203'
    };
    wrapper = shallow(<Wallet wallet={wallet} user={user} />);
  });
  describe('#render', () => {
    it('should render tr and with four td', () => {
      const expectedIdText = '( ID : 1 )';

      expect(wrapper.find('.dashboard__wallet--card').length).toBe(1);
      expect(wrapper.find('#wallet-id').text()).toBe(expectedIdText);
    });
  });
});
