import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import DashboardContainer from './DashboardContainer';
import Wallet from '../Components/Wallet';
import WalletError from '../Components/WalletError';
import TransactionList from '../Components/TransactionList';

jest.mock('axios');

describe('DashboardContainer', () => {
  let wrapper;
  let wallet;
  let walletResponse;
  let transactionResponse;
  let firstTransaction;
  let secondTransaction;
  let thirdTransaction;
  const url = 'http://localhost:3000';
  beforeEach(() => {
    wallet = {
      id: 1,
      userId: 1,
      balance: 110000000000,
      createdAt: '2019-11-28T13:26:15.+07:00',
      updatedAt: '2019-11-28T13:26:15.+07:00'
    };
    firstTransaction = {
      id: 1,
      walletId: 1,
      type: 'deposit',
      amount: 7700000,
      description: 'Payslip 2019-11-28',
      createdAt: '2019-11-28T13:26:15.063Z',
      updatedAt: '2019-11-28T13:26:15.063Z'
    };
    secondTransaction = {
      id: 2,
      walletId: 1,
      type: 'withdraw',
      amount: 30,
      description: 'Buy Cheeseburger for lunch',
      createdAt: '2019-11-28T13:26:15.063Z',
      updatedAt: '2019-11-28T13:26:15.063Z'
    };
    thirdTransaction = {
      id: 3,
      walletId: 1,
      type: 'withdraw',
      amount: 100,
      description: 'Dinner at Italian Steak House',
      createdAt: '2019-11-28T13:26:15.063Z',
      updatedAt: '2019-11-28T13:26:15.063Z'
    };
    walletResponse = { data: wallet };
    axios.get.mockResolvedValueOnce(walletResponse);
    transactionResponse = { data: [firstTransaction, secondTransaction, thirdTransaction] };
    axios.get.mockResolvedValueOnce(transactionResponse);
    wrapper = shallow(<DashboardContainer API_URL={url} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  describe('#render', () => {
    it('should render dashboard with BalanceComponent with balance 110000000000', () => {
      expect(wrapper.find(Wallet).length).toBe(1);
    });

    it('should return data wallet from server', async () => {
      await flushPromises();

      expect(axios.get).toHaveBeenCalledWith(`${url}/users/${wallet.id}/wallets`);
      expect(wrapper.find(Wallet).props().wallet).toEqual(wallet);
    });

    it('should return wallet error if failed fetch data from server', async () => {
      axios.get.mockRejectedValue(Error('Network Error'));
      wrapper = shallow(<DashboardContainer API_URL={url} />);

      await flushPromises();

      expect(wrapper.find(WalletError).length).toBe(1);
      expect(wrapper.find(Wallet).length).toBe(0);
    });

    it('should return three last transaction list from json-server', async () => {
      await flushPromises();

      expect(wrapper.find(TransactionList).props().transactions).toEqual(
        [firstTransaction, secondTransaction, thirdTransaction]
      );
    });
  });
});
