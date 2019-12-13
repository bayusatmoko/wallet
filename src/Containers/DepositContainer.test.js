import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import DepositContainer from './DepositContainer';
import TransactionContainer from './TransactionContainer';

jest.mock('axios');

describe('DepositContainer', () => {
  let wrapper;
  let transaction;
  const API_URL = 'http://localhost:3000/';
  beforeEach(() => {
    transaction = {
      walletId: 1,
      receiverWalletId: 1,
      type: 'DEPOSIT',
      nominal: 1250,
      description: 'Payslip 2019-11-28'
    };
    axios.post.mockResolvedValue(transaction);
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
      axios.get.mockRejectedValue(Error('Network Error'));
      wrapper = shallow(<TransactionContainer API_URL={API_URL} />);

      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(0);
      expect(wrapper.find('FailedNotification').length).toBe(1);
    });
  });
});
