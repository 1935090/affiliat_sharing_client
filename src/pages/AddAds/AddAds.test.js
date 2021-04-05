import React from 'react';
import { shallow } from 'enzyme';
import AddAds from './AddAds';

describe('<AddAds />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddAds />);
    expect(wrapper).toMatchSnapshot();
  });
});
