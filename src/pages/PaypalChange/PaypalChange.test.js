import React from 'react';
import { shallow } from 'enzyme';
import PaypalChange from './PaypalChange';

describe('<PaypalChange />', () => {
  test('renders', () => {
    const wrapper = shallow(<PaypalChange />);
    expect(wrapper).toMatchSnapshot();
  });
});
