import { shallow } from 'enzyme';
import React from 'react';
import TransactionItem from './TransactionItem';

describe('TransactionItem', () => {
  let wrapper;
  let transaction;
  beforeEach(() => {
    transaction = {
      id: 1,
      type: 'deposit',
      amount: 7700000,
      description: 'Payslip 2019-11-28',
      createdAt: '2019-11-28T13:26:15.063Z'
    };
    wrapper = shallow(<TransactionItem transaction={transaction} />);
  });
  describe('#render', () => {
    it('should render tr and with four td', () => {
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find('td').length).toBe(4);
    });

    it('should every td contain value in transaction data', () => {
      const expectedAmount = '$ 7,700,000.00';
      const expectedDate = '28 November 2019';

      expect(wrapper.find('td').at(0).text()).toContain(transaction.type);
      expect(wrapper.find('td').at(1).text()).toContain(transaction.description);
      expect(wrapper.find('td').at(2).text()).toContain(expectedAmount);
      expect(wrapper.find('td').at(3).text()).toContain(expectedDate);
    });
  });
});
