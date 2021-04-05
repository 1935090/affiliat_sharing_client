import React from 'react';
import { shallow } from 'enzyme';
import AddAdsListFilter from './AddAdsListFilter';

describe('<AddAdsListFilter />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddAdsListFilter />);
    expect(wrapper).toMatchSnapshot();
  });
});
