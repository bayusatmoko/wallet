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
      nominal: 250000,
      description: 'Salary from BTPN'
    };
    handleSubmit = jest.fn();
    wrapper = shallow(<TransactionForm
      onSubmit={handleSubmit}
      formTitle="Deposit"
    />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    MockDate.reset();
  });
  describe('#render', () => {
    it('should render nominal input, description input and submit button ', () => {
      expect(wrapper.find('#nominal-input').length).toBe(1);
      expect(wrapper.find('#description-input').length).toBe(1);
      expect(wrapper.find('#submit-button').length).toBe(1);
    });

    it('should return 2500 and Payslip 2019-11-28 in nominal, and description', () => {
      wrapper.find('#nominal-input').simulate('change', { target: { name: 'nominal', value: firstTransaction.nominal } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });

      expect(wrapper.find('#nominal-input').props().value).toBe(firstTransaction.nominal);
      expect(wrapper.find('#description-input').props().value).toBe(firstTransaction.description);
    });

    it('should call handleSubmit when press enter on description input', () => {
      const expectedResult = firstTransaction;

      wrapper.find('#nominal-input').simulate('change', { target: { name: 'nominal', value: firstTransaction.nominal } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });
      wrapper.find('#description-input').simulate('keyUp', { key: 'Enter' });

      expect(handleSubmit).toHaveBeenCalledWith(expectedResult);
    });

    it('should call handleSubmit when press enter on nominal input', () => {
      const expectedResult = firstTransaction;

      wrapper.find('#nominal-input').simulate('change', { target: { name: 'nominal', value: firstTransaction.nominal } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });
      wrapper.find('#nominal-input').simulate('keyUp', { key: 'Enter' });

      expect(handleSubmit).toHaveBeenCalledWith(expectedResult);
    });

    it('should not call onSubmit when the nominal input is under Rp1.000', () => {
      wrapper.find('#nominal-input').simulate('change', { target: { name: 'nominal', value: 750 } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });
      wrapper.find('#submit-button').simulate('click');

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when the nominal input is above Rp100.000.000', () => {
      wrapper.find('#nominal-input').simulate('change', { target: { name: 'nominal', value: 120000000 } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });
      wrapper.find('#submit-button').simulate('click');

      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
});
