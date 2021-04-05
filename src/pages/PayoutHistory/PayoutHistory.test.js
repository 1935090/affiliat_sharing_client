import React from 'react';
import { shallow } from 'enzyme';
import PayoutHistory from './PayoutHistory';

describe('<PayoutHistory />', () => {
  test('renders', () => {
    const wrapper = shallow(<PayoutHistory />);
    expect(wrapper).toMatchSnapshot();
  });
});
