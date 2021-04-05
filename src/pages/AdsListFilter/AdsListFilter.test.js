import React from 'react';
import { shallow } from 'enzyme';
import AdsListFilter from './AdsListFilter';

describe('<AdsListFilter />', () => {
  test('renders', () => {
    const wrapper = shallow(<AdsListFilter />);
    expect(wrapper).toMatchSnapshot();
  });
});
