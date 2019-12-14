import { shallow } from 'enzyme';
import React from 'react';
import TransactionItem from './TransactionItem';

describe('TransactionItem', () => {
  let wrapper;
  let transaction;
  let transferTransaction;
  beforeEach(() => {
    transaction = {
      id: 1,
      walletId: 1,
      receiverWalletId: 1,
      type: 'DEPOSIT',
      nominal: 11111,
      description: 'Uang suap',
      createdAt: '2019-12-13T09:10:31.186Z',
      updatedAt: '2019-12-13T09:10:31.186Z',
      receiver: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      },
      sender: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      }
    };
    transferTransaction = {
      id: 2,
      walletId: 1,
      receiverWalletId: 2,
      type: 'TRANSFER',
      nominal: 22222,
      description: 'Money laundering to farah',
      createdAt: '2019-12-13T09:10:31.186Z',
      updatedAt: '2019-12-13T09:10:31.186Z',
      receiver: {
        id: 2,
        user: {
          name: 'Farah'
        }
      },
      sender: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      }
    };
    wrapper = shallow(<TransactionItem
      transaction={transaction}
      walletId={transaction.walletId}
    />);
  });
  describe('#render', () => {
    it('should render tr and with four td', () => {
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find('td').length).toBe(5);
    });

    it('should every td contain value in transaction data', () => {
      const expectedAmount = 'IDR11,111';
      const expectedDate = '13 December 2019';

      expect(wrapper.find('td').at(0).text()).toContain(transaction.type);
      expect(wrapper.find('td').at(1).text()).toContain(transaction.description);
      expect(wrapper.find('td').at(2).text()).toContain(expectedAmount);
      expect(wrapper.find('td').at(3).text()).toContain(expectedDate);
      expect(wrapper.find('td').at(4).text()).toContain('');
    });

    it('should text color of amount is green when the type is DEPOSIT', () => {
      expect(wrapper.find('td').at(2).hasClass('green-text')).toBeTruthy();
      expect(wrapper.find('td').at(4).text()).toEqual('');
    });

    it('should text color of amount is red when the type is TRANSFER to another account', () => {
      wrapper = shallow(<TransactionItem
        transaction={transferTransaction}
        walletId={transferTransaction.walletId}
      />);
      const expectedText = `To ${transferTransaction.receiver.user.name}`;

      expect(wrapper.find('td').at(2).hasClass('red-text')).toBeTruthy();
      expect(wrapper.find('td').at(4).text()).toContain(expectedText);
    });

    it('should text color of amount is green when the type is TRANSFER from another account', () => {
      wrapper = shallow(<TransactionItem
        transaction={transferTransaction}
        walletId={transferTransaction.receiverWalletId}
      />);
      const expectedText = `From ${transferTransaction.sender.user.name}`;

      expect(wrapper.find('td').at(2).hasClass('green-text')).toBeTruthy();
      expect(wrapper.find('td').at(4).text()).toContain(expectedText);
    });
  });
});
