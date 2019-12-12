import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import TransactionContainer from './TransactionContainer';

jest.mock('axios');

describe('TransactionContainer', () => {
  let wrapper;
  let firstTransaction;
  let secondTransaction;
  let thirdTransaction;
  let response;
  const url = 'http://localhost:4000';
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
    response = { data: [firstTransaction, secondTransaction, thirdTransaction] };
    axios.get.mockResolvedValue(response);
    wrapper = shallow(<TransactionContainer API_URL={url} />);
  });
  describe('#render', () => {
    it('should render TransactionForm and TransactionList', () => {
      expect(wrapper.find('TransactionForm').length).toBe(1);
      expect(wrapper.find('TransactionList').length).toBe(1);
    });

    it('should add new transaction to transactions state when onSubmit is invoked', () => {
      const transactionForm = wrapper.find('TransactionForm');

      transactionForm.props().onSubmit(firstTransaction);

      expect(wrapper.find('TransactionList')
        .props().transactions)
        .toContainEqual(firstTransaction);
    });

    it('should return data from json-server', async () => {
      await flushPromises();

      expect(wrapper.find('TransactionList').props().transactions).toEqual([firstTransaction, secondTransaction, thirdTransaction]);
    });

    it('should not render transaction list but render transaction error when server error', async () => {
      axios.get.mockRejectedValue(Error('Network Error'));
      wrapper = shallow(<TransactionContainer API_URL={url} />);

      await flushPromises();

      expect(wrapper.find('TransactionError').length)
        .toBe(1);
      expect(wrapper.find('TransactionList').length)
        .toBe(0);
    });

    it('should add new transaction on the server when the onSubmit is invoked', async () => {
      const newResponse = { data: thirdTransaction };
      axios.post.mockResolvedValue(newResponse);
      wrapper = shallow(<TransactionContainer API_URL={url} />);
      const transactionForm = wrapper.find('TransactionForm');

      transactionForm.simulate('submit', thirdTransaction);

      await flushPromises();
      expect(wrapper.find('TransactionList')
        .props().transactions)
        .toContainEqual(thirdTransaction);
      expect(axios.post).toHaveBeenCalledWith(`${url}/transactions`, thirdTransaction);
    });
  });
});
