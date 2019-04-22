import React from 'react';
import { shallow } from '../../enzyme';
import Home from '../../src/components/pages/Home';

describe('My Journal application, Home page', () => {
  it('renders without crashing', () => {
    shallow(<Home/>);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Home/>);
    const contentTitle = wrapper.find('h4.userNoteTitle').children().first().text();
    expect(contentTitle).toEqual('All Notes');
  });
});
