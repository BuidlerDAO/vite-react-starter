import * as pkg from '../../package.json';

export const projectBasePath: string = pkg.name + '/' + pkg.version + '/';

const config = {
  basename: '',
  defaultPath: '/dashboard/default',
  name: projectBasePath,
  index: 'index.html',
  indexOut: './index.html',
  createdTime: '2021-05-26',
  publicPath: '/',
  output: '../dist',
  cdn: {
    host: 'https://cdn.vadxq.com/'
  }
};

export default config;
