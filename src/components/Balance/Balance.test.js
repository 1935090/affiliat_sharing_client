import React from 'react';
import { shallow } from 'enzyme';
import Balance from './Balance';

describe('<Balance />', () => {
  test('renders', () => {
    const wrapper = shallow(<Balance />);
    expect(wrapper).toMatchSnapshot();
  });
});
