import { shallow } from 'enzyme';
import React from 'react';
import UserInfo from './UserInfo';

describe('UserInfo', () => {
  let wrapper;
  let user;
  beforeEach(() => {
    user = {
      id: 1,
      name: 'Bill Gates',
      email: 'bill-gates@microsoft.com',
      password: '123123123123',
      phoneNumber: '251 11 617 2750',
      createdAt: '2019-11-28T13:26:15.063Z',
      updatedAt: '2019-11-28T13:26:15.063Z'
    };
    wrapper = shallow(<UserInfo user={user} />);
  });
  describe('#render', () => {
    it('should render user info', () => {
      expect(wrapper.find('.user-image')).toHaveLength(1);
      expect(wrapper.find('.user-name').text()).toBe(user.name);
      expect(wrapper.find('.user-phone').text()).toBe(user.phoneNumber);
      expect(wrapper.find('.user-email').text()).toBe(user.email);
    });
  });
});
