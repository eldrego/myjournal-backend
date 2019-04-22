import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from '../../enzyme';
import AllNotes from '../../src/components/pages/AllNotes';
import notes from '../../mockData/notes';

const setUp = () => {
  const props = {
    getAllNotes: jest.fn(),
    notes
  };

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const store = mockStore({
    notes
  });

  const wrapper = shallow(<AllNotes {...props} store={store}/>);

  return {
    props,
    wrapper
  };
};

describe('My Journal application, AllNotes component', () => {
  const { wrapper } = setUp();
  // it('should render correctly', () => {
  //   expect(wrapper.find('div').first().hasClass('site-content')).toBe(true);
  // });

  it('renders without crashing', () => {
    shallow(<wrapper/>);
  });
});
