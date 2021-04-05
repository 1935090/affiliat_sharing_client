import React from 'react';
import { shallow } from 'enzyme';
import CreditCardConfirm from './CreditCardConfirm';

describe('<CreditCardConfirm />', () => {
  test('renders', () => {
    const wrapper = shallow(<CreditCardConfirm />);
    expect(wrapper).toMatchSnapshot();
  });
});
