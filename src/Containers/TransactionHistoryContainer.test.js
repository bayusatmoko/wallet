import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import TransactionHistoryContainer from './TransactionHistoryContainer';

jest.mock('axios');

describe('TransactionHistoryContainer', () => {
  let wrapper;
  let firstTransaction;
  let secondTransaction;
  let thirdTransaction;
  let response;
  let transactions = [];
  let mockedHandleSort;
  beforeEach(() => {
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
      createdAt: '2019-11-27T13:26:15.063Z',
      updatedAt: '2019-11-27T13:26:15.063Z'
    };
    thirdTransaction = {
      id: 3,
      walletId: 1,
      type: 'withdraw',
      amount: 100,
      description: 'Dinner at Italian Steak House',
      createdAt: '2019-11-26T13:26:15.063Z',
      updatedAt: '2019-11-26T13:26:15.063Z'
    };
    transactions = [firstTransaction, secondTransaction, thirdTransaction];
    response = { data: transactions };
    axios.get.mockResolvedValue(response);
    mockedHandleSort = jest.fn();
    wrapper = shallow(<TransactionHistoryContainer
      transactions={transactions}
      onSort={mockedHandleSort}
    />);
  });
  describe('#render', () => {
    it('should render TransactionList', () => {
      expect(wrapper.find('TransactionList').length).toBe(1);
    });

    it('should render all transaction list', () => {
      const transactionList = wrapper.find('TransactionList');

      expect(transactionList.props().transactions).toEqual(transactions);
    });

    it('should render error transaction when failed to fetch transactions', async () => {
      axios.get.mockRejectedValue(Error('Network Error'));
      wrapper = shallow(<TransactionHistoryContainer transactions={transactions} />);
      await flushPromises();

      expect(wrapper.find('TransactionError')).toHaveLength(1);
    });

    it('should render transactions by ascending date', async () => {
      const expectedResult = [thirdTransaction, secondTransaction, firstTransaction];
      const sortColumn = 'date';
      const orderBy = 'asc';

      wrapper.find('TransactionList').simulate('sort', sortColumn, orderBy);
      await flushPromises();

      expect(wrapper.find('TransactionList').props().transactions).toEqual(expectedResult);
    });

    it('should render transactions by descending date', async () => {
      const expectedResult = [thirdTransaction, secondTransaction, firstTransaction];
      const sortColumn = 'date';
      const orderBy = 'asc';

      wrapper.find('TransactionList').simulate('sort', sortColumn, orderBy);
      await flushPromises();

      expect(wrapper.find('TransactionList').props().transactions).toEqual(expectedResult);
    });
  });
});
