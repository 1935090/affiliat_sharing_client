import React from 'react';
import { shallow } from 'enzyme';
import MakeAnAd from './MakeAnAd';

describe('<MakeAnAd />', () => {
  test('renders', () => {
    const wrapper = shallow(<MakeAnAd />);
    expect(wrapper).toMatchSnapshot();
  });
});
