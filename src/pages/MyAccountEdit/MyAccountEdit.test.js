import React from 'react';
import { shallow } from 'enzyme';
import MyAccountEdit from './MyAccountEdit';

describe('<MyAccountEdit />', () => {
  test('renders', () => {
    const wrapper = shallow(<MyAccountEdit />);
    expect(wrapper).toMatchSnapshot();
  });
});
