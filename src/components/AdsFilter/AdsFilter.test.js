import React from 'react';
import { shallow } from 'enzyme';
import AdsFilter from './AdsFilter';

describe('<AdsFilter />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdsFilter />);
    expect(wrapper).toMatchSnapshot();
  });
});
