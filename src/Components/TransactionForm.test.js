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
      nominal: 2500,
      description: 'Salary from BTPN'
    };
    handleSubmit = jest.fn();
    wrapper = shallow(<TransactionForm
      onSubmit={handleSubmit}
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

    it('should call handleSubmit when the submit button is clicked', () => {
      const expectedResult = firstTransaction;

      wrapper.find('#nominal-input').simulate('change', { target: { name: 'nominal', value: firstTransaction.nominal } });
      wrapper.find('#description-input').simulate('change', { target: { name: 'description', value: firstTransaction.description } });
      wrapper.find('#submit-button').simulate('click');
      expectedResult.createdAt = new Date();
      expect(handleSubmit).toHaveBeenCalledWith(expectedResult);
    });
  });
});
