import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import TransferContainer from './TransferContainer';

jest.mock('axios');

describe('TransferContainer', () => {
  let wrapper;
  const users = [{
    id: 1,
    name: 'Fadele',
    email: 'fadele@btpn.com',
    wallet: {
      id: 1,
      balance: 500
    }
  }, {
    id: 2,
    name: 'Hudaudah',
    email: 'hudah@btpn.com',
    wallet: {
      id: 2,
      balance: 1000
    }
  }];
  const transaction = {
    walletId: 1,
    receiverWalletId: 2,
    type: 'TRANSFER',
    nominal: 1250,
    description: 'Payslip 2019-11-28'
  };
  const API_URL = 'http://localhost:3000/';
  beforeEach(() => {
    wrapper = shallow(<TransferContainer API_URL={API_URL} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should display list of receivers based on query in ReceiverSearch', async () => {
      axios.get.mockResolvedValue({ data: [users[0]] });
      const receiverSearch = wrapper.find('ReceiverSearch');

      receiverSearch.simulate('submit', 'fadele@btpn.com');
      await flushPromises();

      expect(wrapper.find('ReceiverList').props().receivers).toEqual([users[0]]);
    });

    it('should display receiver name and email when item in ReceiverList is clicked', () => {
      const receiverList = wrapper.find('ReceiverList');

      receiverList.simulate('click', users[0]);

      expect(wrapper.find('#receiver-selected').text()).toEqual(users[0].name);
    });

    it('should call POST with transaction data when button submit is clicked', async () => {
      axios.post.mockResolvedValue({ data: transaction });
      const transactionForm = wrapper.find('TransactionForm');
      const receiverList = wrapper.find('ReceiverList');

      receiverList.simulate('click', users[1]);
      transactionForm.simulate('submit', transaction);
      await flushPromises();

      expect(axios.post).toHaveBeenCalledWith(`${API_URL}/transactions`, transaction);
    });
  });
});
