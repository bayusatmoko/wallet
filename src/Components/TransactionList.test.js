import { shallow } from 'enzyme';
import React from 'react';
import TransactionList from './TransactionList';

describe('TransactionList', () => {
  let wrapper;
  let firstTransaction;
  let secondTransaction;
  let thirdTransaction;
  let transactions;
  let mockedOnSort;
  beforeEach(() => {
    firstTransaction = {
      id: 1,
      walletId: 1,
      type: 'deposit',
      nominal: 7700000,
      description: 'Payslip 2019-11-28',
      createdAt: '2019-11-28T13:26:15.063Z',
      updatedAt: '2019-11-28T13:26:15.063Z'
    };
    secondTransaction = {
      id: 2,
      walletId: 1,
      type: 'withdraw',
      nominal: 30,
      description: 'Buy Cheeseburger for lunch',
      createdAt: '2019-11-27T13:26:15.063Z',
      updatedAt: '2019-11-27T13:26:15.063Z'
    };
    thirdTransaction = {
      id: 3,
      walletId: 1,
      type: 'withdraw',
      nominal: 100,
      description: 'Dinner at Italian Steak House',
      createdAt: '2019-11-26T13:26:15.063Z',
      updatedAt: '2019-11-26T13:26:15.063Z'
    };
    mockedOnSort = jest.fn();
    transactions = [firstTransaction, secondTransaction, thirdTransaction];
    wrapper = shallow(<TransactionList transactions={transactions} onSort={mockedOnSort} />);
  });
  describe('#render', () => {
    it('should render table, thead and tbody', () => {
      expect(wrapper.find('table').length).toBe(1);
      expect(wrapper.find('thead').length).toBe(1);
      expect(wrapper.find('tbody').length).toBe(1);
    });

    it('should render TransactionItem component with firstTransaction', () => {
      expect(wrapper.find('TransactionItem').at(0).props().transaction).toEqual(firstTransaction);
    });

    it('should call the onSort when the table header of Date is clicked', async () => {
      wrapper.find('#date-header').simulate('click', 'date');
      await flushPromises();

      expect(mockedOnSort).toHaveBeenCalled();
      expect(mockedOnSort).toHaveBeenCalledTimes(1);
      expect(mockedOnSort).toHaveBeenCalledWith('date', 'asc');
    });
  });
});
