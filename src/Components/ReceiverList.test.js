import React from 'react';
import { shallow } from 'enzyme';
import ReceiverList from './ReceiverList';

describe('ReceiverList', () => {
  let receivers;
  let mockedOnClick;
  beforeEach(() => {
    mockedOnClick = jest.fn();
    receivers = [
      {
        id: 1,
        name: 'Fadel',
        wallet: {
          id: 1
        }
      }, {
        id: 2,
        name: 'Sena',
        wallet: {
          id: 2
        }
      }
    ];
  });
  describe('#render', () => {
    it('should render ReceiverItem as many as receivers', () => {
      const wrapper = shallow(<ReceiverList receivers={receivers} onClick={mockedOnClick} />);

      const receiverItems = wrapper.find('ReceiverItem');

      expect(receiverItems).toHaveLength(receivers.length);
    });

    it('should render ReceiverItem with receiver props', () => {
      const wrapper = shallow(<ReceiverList receivers={receivers} onClick={mockedOnClick} />);

      const receiverItem = wrapper.find('ReceiverItem').first();

      expect(receiverItem.props().receiver).toEqual(receivers[0]);
    });

    it('should call onClick when ReceiverItem is clicked', () => {
      const wrapper = shallow(<ReceiverList receivers={receivers} onClick={mockedOnClick} />);

      const receiverItem = wrapper.find('ReceiverItem').first();
      receiverItem.simulate('click');

      expect(mockedOnClick).toHaveBeenCalledWith(receivers[0]);
    });
  });
});
