import React from 'react';
import { shallow } from 'enzyme';
import ConfirmShareAdsDetail from './ConfirmShareAdsDetail';

describe('<ConfirmShareAdsDetail />', () => {
  test('renders', () => {
    const wrapper = shallow(<ConfirmShareAdsDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
