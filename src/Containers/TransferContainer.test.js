import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import { when } from 'jest-when';
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
    name: 'Huda',
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
  const API_URL = 'http://localhost:3000';
  beforeEach(() => {
    when(axios.get)
      .calledWith('http://localhost:3000/users?receiver=fadele@btpn.com')
      .mockResolvedValue({ data: [users[0]] })
      .calledWith('http://localhost:3000/users/1/wallets')
      .mockResolvedValue({ data: users[0].wallet });
    axios.post.mockResolvedValue({ data: transaction });
    wrapper = shallow(<TransferContainer API_URL={API_URL} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should display list of receivers based on query in ReceiverSearch', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', 'fadele@btpn.com');
      await flushPromises();

      expect(wrapper.find('ReceiverList').props().receivers).toEqual([users[0]]);
    });

    it('should display receiver name and email when item in ReceiverList is clicked', () => {
      wrapper.find('ReceiverList').simulate('click', users[0]);

      expect(wrapper.find('TransactionForm').props().formTitle).toContain(users[0].name);
      expect(wrapper.find('TransactionForm').props().formTitle).toContain(users[0].email);
    });

    it('should not render transaction form when not selected a receiver yet', () => {
      expect(wrapper.find('TransactionForm')).toHaveLength(0);
    });

    it('should render transaction form when selected a receiver', () => {
      wrapper.find('ReceiverList').simulate('click', users[1]);

      wrapper.find('TransactionForm').simulate('submit', transaction);

      expect(wrapper.find('TransactionForm')).toHaveLength(1);
    });

    it('should call POST with transaction data when button submit is clicked', async () => {
      wrapper.find('ReceiverList').simulate('click', users[1]);

      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(axios.post).toHaveBeenCalledWith(`${API_URL}/transactions`, transaction);
    });

    it('should not render any notification when not submitted yet', () => {
      expect(wrapper.find('FailedNotification').length).toBe(0);
      expect(wrapper.find('SuccessNotification').length).toBe(0);
    });

    it('should not render success notification but render failed notification when failed to transfer', async () => {
      axios.post.mockRejectedValue(Error('Network Error'));
      wrapper = shallow(<TransferContainer API_URL={API_URL} />);

      wrapper.find('ReceiverList').simulate('click', users[1]);
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(0);
      expect(wrapper.find('FailedNotification').length).toBe(1);
    });

    it('should render success notification when the transaction is successful', async () => {
      wrapper.find('ReceiverList').simulate('click', users[1]);
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(1);
      expect(wrapper.find('FailedNotification').length).toBe(0);
    });

    it('should render success notification with the balance when the transaction is successful', async () => {
      wrapper.find('ReceiverList').simulate('click', users[0]);
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').props().balance).toBe(users[0].wallet.balance);
    });

    it('should render walletError when receiver is not found', async () => {
      when(axios.get)
        .calledWith('http://localhost:3000/users?receiver=fadele@btpn.com')
        .mockRejectedValue(new Error('Receiver not found!'));
      wrapper = shallow(<TransferContainer API_URL={API_URL} />);

      wrapper.find('ReceiverSearch').simulate('submit', 'fadele@btpn.com');
      await flushPromises();

      expect(wrapper.find('ReceiverList').length).toBe(0);
      expect(wrapper.find('WalletError').length).toBe(1);
    });
  });
});
