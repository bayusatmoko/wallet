import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import TransactionForm from './TransactionForm';

describe('TransactionForm', () => {
  let wrapper;
  let handleSubmit;
  let firstTransaction;
  beforeEach(() => {
    MockDate.set('2019-12-12');
    firstTransaction = {
      walletId: 1,
      type: 'deposit',
      amount: 7700000,
      description: 'Payslip 2019-11-28'
    };
    handleSubmit = jest.fn();
    wrapper = shallow(<TransactionForm onSubmit={handleSubmit} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    MockDate.reset();
  });
  describe('#render', () => {
    it('should render type transaction select, amount input, description input and submit button ', () => {
      expect(wrapper.find('#type-select').length).toBe(1);
      expect(wrapper.find('#amount-input').length).toBe(1);
      expect(wrapper.find('#description-input').length).toBe(1);
      expect(wrapper.find('#submit-button').length).toBe(1);
    });

    it('should return deposit, 7700000 and Payslip 2019-11-28 in input type, amount and description', () => {
      wrapper.find('#type-select').simulate('change', { target: { name: 'type', value: firstTransaction.type } });
      wrapper.find('#amount-input').simulate('change', { target: { name: 'amount', value: firstTransaction.amount } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });

      expect(wrapper.find('#type-select').props().value).toBe(firstTransaction.type);
      expect(wrapper.find('#amount-input').props().value).toBe(firstTransaction.amount);
      expect(wrapper.find('#description-input').props().value).toBe(firstTransaction.description);
    });

    it('should call handleSubmit when the submit button is clicked', () => {
      const expectedResult = firstTransaction;

      wrapper.find('#type-select').simulate('change', { target: { name: 'type', value: firstTransaction.type } });
      wrapper.find('#amount-input').simulate('change', { target: { name: 'amount', value: firstTransaction.amount } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });
      wrapper.find('#submit-button').simulate('click');
      expectedResult.createdAt = new Date();
      expect(handleSubmit).toHaveBeenCalledWith(expectedResult);
    });
  });
});
