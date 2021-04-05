import React from 'react';
import { shallow } from 'enzyme';
import PromoAdResult from './PromoAdResult';

describe('<PromoAdResult />', () => {
  test('renders', () => {
    const wrapper = shallow(<PromoAdResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
