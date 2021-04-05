import React from 'react';
import { shallow } from 'enzyme';
import PaypalAccount from './PaypalAccount';

describe('<PaypalAccount />', () => {
  test('renders', () => {
    const wrapper = shallow(<PaypalAccount />);
    expect(wrapper).toMatchSnapshot();
  });
});
