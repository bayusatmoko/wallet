import React from 'react';
import { shallow } from 'enzyme';
import ReceiverSearch from './ReceiverSearch';

describe('ReceiverSearch', () => {
  let wrapper;
  const query = 'fadelay@gmail.com';
  let mockedOnSubmit;
  beforeEach(() => {
    mockedOnSubmit = jest.fn();
    wrapper = shallow(<ReceiverSearch onSubmit={mockedOnSubmit} />);
  });

  describe('#render', () => {
    it('should call onSubmit with search query', () => {
      const searchInput = wrapper.find('#search-input');
      const searchButton = wrapper.find('#submit-button');

      searchInput.simulate('change', { target: { value: query } });
      searchButton.simulate('click');

      expect(mockedOnSubmit).toHaveBeenCalledWith(query);
    });

    it('should call onKeyPress when enter is pressed', () => {
      const searchInput = wrapper.find('#search-input');

      searchInput.simulate('change', { target: { value: query } });
      searchInput.simulate('keyUp', { key: 'Enter' });

      expect(mockedOnSubmit).toHaveBeenCalledWith(query);
    });
  });
});
