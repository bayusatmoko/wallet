import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import UserInfoContainer from './UserInfoContainer';

jest.mock('axios');

describe('UserInfoContainer', () => {
  describe('#render', () => {
    let wrapper;
    let user;
    beforeEach(async () => {
      user = {
        id: 1,
        name: 'Bill Gates',
        email: 'bill-gates@microsoft.com',
        password: '123123123123',
        phoneNumber: '251 11 617 2750',
        createdAt: '2019-11-28T13:26:15.063Z',
        updatedAt: '2019-11-28T13:26:15.063Z'
      };
      axios.get.mockResolvedValue({ data: user });
      wrapper = shallow(<UserInfoContainer />);
      await flushPromises();
    });
    afterEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });
    it('should render UserInfo', () => {
      const userInfo = wrapper.find('UserInfo');

      expect(userInfo).toHaveLength(1);
    });

    it('should pass user to the User Info', () => {
      const userInfo = wrapper.find('UserInfo');

      expect(userInfo.props().user).toBe(user);
    });
  });
});
