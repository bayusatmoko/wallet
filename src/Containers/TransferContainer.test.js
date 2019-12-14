import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import { when } from 'jest-when';
import TransferContainer from './TransferContainer';

jest.mock('axios');

describe('TransferContainer', () => {
  let wrapper;
  const sender = {
    id: 1,
    name: 'Fadele',
    email: 'fadele@btpn.com',
    wallet: {
      id: 1,
      balance: 2500
    }
  };
  const receiver = {
    id: 2,
    name: 'Huda',
    email: 'hudah@btpn.com',
    wallet: {
      id: 2,
      balance: 1000
    }
  };
  const transaction = {
    walletId: sender.wallet.id,
    receiverWalletId: receiver.wallet.id,
    type: 'TRANSFER',
    nominal: 1250,
    description: 'Payslip 2019-11-28'
  };
  const API_URL = 'http://localhost:3000';
  beforeEach(() => {
    when(axios.get)
      .calledWith(`http://localhost:3000/users?email=${receiver.email}`)
      .mockResolvedValue({ data: receiver })
      .calledWith('http://localhost:3000/users/1/wallets')
      .mockResolvedValue({ data: sender.wallet });
    axios.post.mockResolvedValue({ data: transaction });
    wrapper = shallow(<TransferContainer API_URL={API_URL} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should only receiver search when start the page', () => {
      expect(wrapper.find('ReceiverSearch')).toHaveLength(1);
      expect(wrapper.find('TransactionForm')).toHaveLength(0);
    });

    it('should only render transaction form when searched a receiver', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', receiver.email);
      await flushPromises();

      expect(wrapper.find('ReceiverSearch')).toHaveLength(0);
      expect(wrapper.find('TransactionForm')).toHaveLength(1);
    });

    it('should render receiver name and email when found a receiver', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', receiver.email);
      await flushPromises();

      expect(wrapper.find('TransactionForm').props().formTitle).toContain(receiver.name);
      expect(wrapper.find('TransactionForm').props().formTitle).toContain(receiver.email);
    });

    it('should not render transaction form when not selected a receiver yet', () => {
      expect(wrapper.find('TransactionForm')).toHaveLength(0);
    });


    it('should call POST with transaction data when button submit is clicked', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', receiver.email);
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);

      expect(axios.post).toHaveBeenCalledWith(`${API_URL}/transactions`, transaction);
    });

    it('should not render any notification when not submitted yet', () => {
      expect(wrapper.find('FailedNotification').length).toBe(0);
      expect(wrapper.find('SuccessNotification').length).toBe(0);
    });

    it('should not render success notification but render failed notification when failed to transfer', async () => {
      axios.post.mockRejectedValue(Error('Network Error'));
      wrapper = shallow(<TransferContainer API_URL={API_URL} />);

      wrapper.find('ReceiverSearch').simulate('submit', receiver.email);
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(0);
      expect(wrapper.find('FailedNotification').length).toBe(1);
    });

    it('should render success notification when the transaction is successful', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', receiver.email);
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(1);
      expect(wrapper.find('FailedNotification').length).toBe(0);
    });

    it('should render success notification with the balance when the transaction is successful', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', receiver.email);
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').props().balance).toBe(sender.wallet.balance);
    });

    it('should render walletError when receiver is not found', async () => {
      when(axios.get)
        .calledWith(`http://localhost:3000/users?email=${receiver.email}`)
        .mockRejectedValue(new Error('Receiver not found!'));
      wrapper = shallow(<TransferContainer API_URL={API_URL} />);

      wrapper.find('ReceiverSearch').simulate('submit', receiver.email);
      await flushPromises();

      expect(wrapper.find('WalletError').length).toBe(1);
    });
  });
});
