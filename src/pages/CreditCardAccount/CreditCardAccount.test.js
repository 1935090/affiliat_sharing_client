import React from 'react';
import { shallow } from 'enzyme';
import CreditCardAccount from './CreditCardAccount';

describe('<CreditCardAccount />', () => {
  test('renders', () => {
    const wrapper = shallow(<CreditCardAccount />);
    expect(wrapper).toMatchSnapshot();
  });
});
