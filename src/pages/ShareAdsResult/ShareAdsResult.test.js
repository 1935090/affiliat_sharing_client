import React from 'react';
import { shallow } from 'enzyme';
import ShareAdsResult from './ShareAdsResult';

describe('<ShareAdsResult />', () => {
  test('renders', () => {
    const wrapper = shallow(<ShareAdsResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
