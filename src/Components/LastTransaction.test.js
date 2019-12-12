import { shallow } from 'enzyme';
import React from 'react';
import LastTransaction from './LastTransaction';

describe('LastTransaction', () => {
  let wrapper;
  let firstTransaction;
  let secondTransaction;
  let thirdTransaction;
  let lastTransactions;
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
    lastTransactions = [firstTransaction, secondTransaction, thirdTransaction];
    wrapper = shallow(<LastTransaction transactions={lastTransactions} />);
  });
  describe('#render', () => {
    it('should render div with card class triple', () => {
      expect(wrapper.find('.last-transaction__card').length).toBe(3);
    });
  });
});
