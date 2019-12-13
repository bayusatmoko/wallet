import { shallow } from 'enzyme';
import React from 'react';
import TransactionItem from './TransactionItem';

describe('TransactionItem', () => {
  let wrapper;
  let transaction;
  beforeEach(() => {
    transaction = {
      id: 13,
      walletId: 1,
      receiverWalletId: 1,
      type: 'DEPOSIT',
      nominal: 1000,
      description: 'Uang suap',
      createdAt: '2019-12-13T03:53:50.514Z',
      updatedAt: '2019-12-13T03:53:50.514Z',
      receiver: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      }
    };
    wrapper = shallow(<TransactionItem transaction={transaction} />);
  });
  describe('#render', () => {
    it('should render tr and with four td', () => {
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find('td').length).toBe(5);
    });

    it('should every td contain value in transaction data', () => {
      const expectedAmount = 'IDR1,000';
      const expectedDate = '13 December 2019';

      expect(wrapper.find('td').at(0).text()).toContain(transaction.type);
      expect(wrapper.find('td').at(1).text()).toContain(transaction.description);
      expect(wrapper.find('td').at(2).text()).toContain(expectedAmount);
      expect(wrapper.find('td').at(3).text()).toContain(expectedDate);
      expect(wrapper.find('td').at(4).text()).toContain(transaction.receiver.user.name);
    });
  });
});
