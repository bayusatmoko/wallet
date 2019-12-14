import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import React from 'react';
import App from './App';
import NoMatch from './Components/NoMatch';

jest.mock('./Containers/DashboardContainer', () => {
  const DashboardContainer = () => true;
  return {
    __esModule: true,
    default: DashboardContainer
  };
});

describe('App', () => {
  describe('#render', () => {
    it('should render to Transaction page when the path url is /transaction', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/transaction']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find('Route').props().path).toEqual('/transaction');
      expect(wrapper.find('DashboardContainer')).toHaveLength(0);
      expect(wrapper.find('TransactionContainer')).toHaveLength(1);
    });

    it('should render to Dashboard page when the path url is /', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find('Route').props().path).toEqual('/');
      expect(wrapper.find('DashboardContainer')).toHaveLength(1);
      expect(wrapper.find('TransactionContainer')).toHaveLength(0);
    });

    it('should render to Deposit page when the path url is /deposit', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/deposit']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find('Route').props().path).toEqual('/deposit');
      expect(wrapper.find('DashboardContainer')).toHaveLength(0);
      expect(wrapper.find('TransactionContainer')).toHaveLength(0);
      expect(wrapper.find('DepositContainer')).toHaveLength(1);
    });

    it('should render to Transfer page when the path url is /transfer', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/transfer']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find('Route').props().path).toEqual('/transfer');
      expect(wrapper.find('DashboardContainer')).toHaveLength(0);
      expect(wrapper.find('TransactionContainer')).toHaveLength(0);
      expect(wrapper.find('DepositContainer')).toHaveLength(0);
      expect(wrapper.find('TransferContainer')).toHaveLength(1);
    });

    it('should render to no match page when the path url is /asdkjhkj', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/asdkjhkj']}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper.find('Route').props().path).toEqual('*');
      expect(wrapper.find('DashboardContainer')).toHaveLength(0);
      expect(wrapper.find('TransactionContainer')).toHaveLength(0);
      expect(wrapper.find('DepositContainer')).toHaveLength(0);
      expect(wrapper.find('TransferContainer')).toHaveLength(0);
      expect(wrapper.find(NoMatch)).toHaveLength(1);
    });
  });
});
