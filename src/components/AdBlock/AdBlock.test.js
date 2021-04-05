import React from 'react';
import { shallow } from 'enzyme';
import AdBlock from './AdBlock';

describe('<AdBlock />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdBlock />);
    expect(wrapper).toMatchSnapshot();
  });
});
