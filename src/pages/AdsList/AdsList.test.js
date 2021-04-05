import React from 'react';
import { shallow } from 'enzyme';
import AdsList from './AdsList';

describe('<AdsList />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdsList />);
    expect(wrapper).toMatchSnapshot();
  });
});
