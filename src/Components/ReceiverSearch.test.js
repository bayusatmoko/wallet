import React from 'react';
import { shallow } from 'enzyme';
import ReceiverSearch from './ReceiverSearch';

describe('ReceiverSearch', () => {
  let wrapper;
  let query;
  let mockedOnSubmit;
  beforeEach(() => {
    mockedOnSubmit = jest.fn();
    query = 'fadelay@gmail.com';
    wrapper = shallow(<ReceiverSearch onSubmit={mockedOnSubmit} />);
  });

  describe('#render', () => {
    it('should call onSubmit with search query', () => {
      const searchInput = wrapper.find('#search');
      const searchButton = wrapper.find('#button');

      searchInput.simulate('change', { target: { value: query } });
      searchButton.simulate('click');

      expect(mockedOnSubmit).toHaveBeenCalledWith(query);
    });
  });
});
