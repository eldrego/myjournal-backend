import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from '../enzyme';
import App from '../src/components/App';


describe('My Journal application', () => {
  it('renders without crashing', () => {
    shallow(<App/>);
  });
});
