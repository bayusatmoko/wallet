import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from './NoMatch';

describe('NoMatch Error', () => {
  describe('#render', () => {
    it('should render NoMatch page with content 404', () => {
      const expectedResult = '404';
      const wrapper = shallow(<NoMatch />);

      expect(wrapper.find('p').text()).toContain(expectedResult);
    });
  });
});
