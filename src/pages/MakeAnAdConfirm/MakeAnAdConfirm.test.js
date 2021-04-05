import React from 'react';
import { shallow } from 'enzyme';
import MakeAnAdConfirm from './MakeAnAdConfirm';

describe('<MakeAnAdConfirm />', () => {
  test('renders', () => {
    const wrapper = shallow(<MakeAnAdConfirm />);
    expect(wrapper).toMatchSnapshot();
  });
});
