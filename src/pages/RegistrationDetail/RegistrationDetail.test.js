import React from 'react';
import { shallow } from 'enzyme';
import RegistrationDetail from './RegistrationDetail';

describe('<RegistrationDetail />', () => {
  test('renders', () => {
    const wrapper = shallow(<RegistrationDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
