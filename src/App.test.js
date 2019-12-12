import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import React from 'react';
import App from './App';
import TransactionContainer from './Containers/TransactionContainer';
import DashboardContainer from './Containers/DashboardContainer';

describe('App', () => {
  describe('#render', () => {
    it('should render to Transaction page when the path url is /transaction', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/transaction']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(DashboardContainer)).toHaveLength(0);
      expect(wrapper.find('Route').props().path).toEqual('/transaction');
      expect(wrapper.find(TransactionContainer)).toHaveLength(1);
    });

    it('should render to Dashboard page when the path url is /', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find(DashboardContainer)).toHaveLength(1);
      expect(wrapper.find('Route').props().path).toEqual('/');
      expect(wrapper.find(TransactionContainer)).toHaveLength(0);
    });
  });
});
