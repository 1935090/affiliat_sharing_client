import React from 'react';
import { shallow } from 'enzyme';
import PromoAdsBlock from './PromoAdsBlock';

describe('<PromoAdsBlock />', () => {
  test('renders', () => {
    const wrapper = shallow(<PromoAdsBlock />);
    expect(wrapper).toMatchSnapshot();
  });
});
