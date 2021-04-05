import React from 'react';
import { shallow } from 'enzyme';
import SMSVerification from './SMSVerification';

describe('<SMSVerification />', () => {
  test('renders', () => {
    const wrapper = shallow(<SMSVerification />);
    expect(wrapper).toMatchSnapshot();
  });
});
