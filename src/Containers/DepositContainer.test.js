import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import DepositContainer from './DepositContainer';

jest.mock('axios');

describe('DepositContainer', () => {
  let wrapper;
  const wallet = {
    userId: 1,
    balance: 2500
  };
  const transaction = {
    walletId: 1,
    receiverWalletId: 1,
    type: 'DEPOSIT',
    nominal: 1250,
    description: 'Payslip 2019-11-28'
  };
  const API_URL = 'http://localhost:3000/';
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: transaction });
    axios.get.mockResolvedValue({ data: wallet });
    wrapper = shallow(<DepositContainer API_URL={API_URL} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should call POST with transaction data when button submit is clicked', async () => {
      const transactionForm = wrapper.find('TransactionForm');

      transactionForm.simulate('submit', transaction);
      await flushPromises();

      expect(axios.post).toHaveBeenCalledWith(`${API_URL}/transactions`, transaction);
    });

    it('should not render success notification but render failed notification when failed to deposit', async () => {
      axios.post.mockRejectedValue(Error('Network Error'));
      wrapper = shallow(<DepositContainer API_URL={API_URL} />);
      const transactionForm = wrapper.find('TransactionForm');

      transactionForm.simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(0);
      expect(wrapper.find('FailedNotification').length).toBe(1);
    });

    it('should render success notification when the transaction is successful', async () => {
      const transactionForm = wrapper.find('TransactionForm');

      transactionForm.simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(1);
      expect(wrapper.find('FailedNotification').length).toBe(0);
    });

    it('should render success notification with the balance when the transaction is successful', async () => {
      const transactionForm = wrapper.find('TransactionForm');

      transactionForm.simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').props().balance).toBe(wallet.balance);
    });

    it('should have Deposit as TransactionForm props', () => {
      expect(wrapper.find('TransactionForm').props().formTitle).toBe('Deposit');
    });
  });
});
