import React from 'react';
import { shallow } from 'enzyme';
import ConfirmShareAdsDetailResult from './ConfirmShareAdsDetailResult';

describe('<ConfirmShareAdsDetailResult />', () => {
  test('renders', () => {
    const wrapper = shallow(<ConfirmShareAdsDetailResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
