import React from 'react';
import { shallow } from 'enzyme';
import CreditCardPayin from './CreditCardPayin';

describe('<CreditCardPayin />', () => {
  test('renders', () => {
    const wrapper = shallow(<CreditCardPayin />);
    expect(wrapper).toMatchSnapshot();
  });
});
