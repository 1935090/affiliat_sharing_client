import React from 'react';
import { shallow } from 'enzyme';
import PaypalEmail from './PaypalEmail';

describe('<PaypalEmail />', () => {
  test('renders', () => {
    const wrapper = shallow(<PaypalEmail />);
    expect(wrapper).toMatchSnapshot();
  });
});
