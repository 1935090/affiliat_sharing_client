import React from 'react';
import { shallow } from 'enzyme';
import Receipt from './Receipt';

describe('<Receipt />', () => {
  test('renders', () => {
    const wrapper = shallow(<Receipt />);
    expect(wrapper).toMatchSnapshot();
  });
});
