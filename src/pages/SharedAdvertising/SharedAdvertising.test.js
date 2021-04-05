import React from 'react';
import { shallow } from 'enzyme';
import SharedAdvertising from './SharedAdvertising';

describe('<SharedAdvertising />', () => {
  test('renders', () => {
    const wrapper = shallow(<SharedAdvertising />);
    expect(wrapper).toMatchSnapshot();
  });
});
