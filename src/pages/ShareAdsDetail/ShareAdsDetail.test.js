import React from 'react';
import { shallow } from 'enzyme';
import ShareAdsDetail from './ShareAdsDetail';

describe('<ShareAdsDetail />', () => {
  test('renders', () => {
    const wrapper = shallow(<ShareAdsDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
