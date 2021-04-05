import React from 'react';
import { shallow } from 'enzyme';
import RegistrationResult from './RegistrationResult';

describe('<RegistrationResult />', () => {
  test('renders', () => {
    const wrapper = shallow(<RegistrationResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
