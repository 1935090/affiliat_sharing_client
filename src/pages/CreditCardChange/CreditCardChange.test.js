import React from 'react';
import { shallow } from 'enzyme';
import CreditCardChange from './CreditCardChange';

describe('<CreditCardChange />', () => {
  test('renders', () => {
    const wrapper = shallow(<CreditCardChange />);
    expect(wrapper).toMatchSnapshot();
  });
});
