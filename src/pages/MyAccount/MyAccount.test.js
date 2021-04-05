import React from 'react';
import { shallow } from 'enzyme';
import MyAccount from './MyAccount';

describe('<MyAccount />', () => {
  test('renders', () => {
    const wrapper = shallow(<MyAccount />);
    expect(wrapper).toMatchSnapshot();
  });
});
