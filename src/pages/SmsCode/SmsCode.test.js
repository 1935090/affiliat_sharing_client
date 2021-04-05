import React from 'react';
import { shallow } from 'enzyme';
import SmsCode from './SmsCode';

describe('<SmsCode />', () => {
  test('renders', () => {
    const wrapper = shallow(<SmsCode />);
    expect(wrapper).toMatchSnapshot();
  });
});
