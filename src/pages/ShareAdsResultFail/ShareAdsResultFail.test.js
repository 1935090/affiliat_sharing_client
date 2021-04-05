import React from 'react';
import { shallow } from 'enzyme';
import ShareAdsResultFail from './ShareAdsResultFail';

describe('<ShareAdsResultFail />', () => {
  test('renders', () => {
    const wrapper = shallow(<ShareAdsResultFail />);
    expect(wrapper).toMatchSnapshot();
  });
});
