require('babel-register')();
require('ignore-styles').default(['.ttf', '.less', '.png', '.svg']);

const { jsdom } = require('jsdom');
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const exposedProperties = ['window', 'navigator', 'document'];

configure({ adapter: new Adapter() });

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
