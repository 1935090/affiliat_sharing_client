import React from 'react';
import { shallow } from 'enzyme';
import PaypalSharedBlock from './PaypalSharedBlock';

describe('<PaypalSharedBlock />', () => {
  test('renders', () => {
    const wrapper = shallow(<PaypalSharedBlock />);
    expect(wrapper).toMatchSnapshot();
  });
});
