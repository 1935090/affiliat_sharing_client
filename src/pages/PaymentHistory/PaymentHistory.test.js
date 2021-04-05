import React from 'react';
import { shallow } from 'enzyme';
import PaymentHistory from './PaymentHistory';

describe('<PaymentHistory />', () => {
  test('renders', () => {
    const wrapper = shallow(<PaymentHistory />);
    expect(wrapper).toMatchSnapshot();
  });
});
