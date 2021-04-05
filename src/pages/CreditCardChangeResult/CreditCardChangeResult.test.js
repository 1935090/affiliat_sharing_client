import React from 'react';
import { shallow } from 'enzyme';
import CreditCardChangeResult from './CreditCardChangeResult';

describe('<CreditCardChangeResult />', () => {
  test('renders', () => {
    const wrapper = shallow(<CreditCardChangeResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
