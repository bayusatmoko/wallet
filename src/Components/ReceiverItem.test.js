import React from 'react';
import { shallow } from 'enzyme';
import ReceiverItem from './ReceiverItem';

describe('ReceiverItem', () => {
  let receiver;
  let mockedOnClick;
  beforeEach(() => {
    mockedOnClick = jest.fn();
    receiver = {
      id: 1,
      name: 'Fadel',
      wallet: {
        id: 1
      }
    };
  });
  describe('#render', () => {
    it('should render receiver info', () => {
      const wrapper = shallow(<ReceiverItem receiver={receiver} onClick={mockedOnClick} />);

      const name = wrapper.find('#name');

      expect(name.text()).toBe(receiver.name);
    });

    it('should called onClick when receiver item is clicked', () => {
      const wrapper = shallow(<ReceiverItem receiver={receiver} onClick={mockedOnClick} />);

      const receiverItem = wrapper.find('#receiver-item');
      receiverItem.simulate('click');

      expect(mockedOnClick).toHaveBeenCalled();
    });
  });
});
