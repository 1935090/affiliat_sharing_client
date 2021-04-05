import React from 'react';
import { shallow } from 'enzyme';
import MyAccountDetail from './MyAccountDetail';

describe('<MyAccountDetail />', () => {
  test('renders', () => {
    const wrapper = shallow(<MyAccountDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
