import React from 'react';
import { shallow } from 'enzyme';
import PaypalPayout from './PaypalPayout';

describe('<PaypalPayout />', () => {
  test('renders', () => {
    const wrapper = shallow(<PaypalPayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
