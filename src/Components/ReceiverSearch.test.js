import React from 'react';
import { shallow } from 'enzyme';
import ReceiverSearch from './ReceiverSearch';

describe('ReceiverSearch', () => {
  let wrapper;
  let query;
  let mockedOnChange;
  beforeEach(() => {
    mockedOnChange = jest.fn();
    query = 'fadelay@gmail.com';
    wrapper = shallow(<ReceiverSearch onChange={mockedOnChange} />);
  });
  describe('#render', () => {
    it('should call onChange with search query', () => {
      const searchInput = wrapper.find('#search');

      searchInput.simulate('change', { target: { value: query } });

      expect(mockedOnChange).toHaveBeenCalledWith(query);
    });
  });
});
