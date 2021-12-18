import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import weiboUploadMediaAdapter from '@jswork/weibo-upload-media-adapter';
import ReactUploadMedia from '../src/main';
import './assets/style.scss';

import '@jswork/next-times';

class App extends React.Component {
  state = {
    value2: [],
    value: [
      'https://tva1.sinaimg.cn/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg',
      'https://tva1.sinaimg.cn/large/008i3skNgy1gqh868msafj302s02st8l.jpg',
      'https://randomuser.me/api/portraits/lego/1.jpg',
      'https://randomuser.me/api/portraits/lego/2.jpg',
      'https://randomuser.me/api/portraits/lego/3.jpg',
      'https://randomuser.me/api/portraits/lego/4.jpg',
      'https://randomuser.me/api/portraits/lego/5.jpg',
      'https://randomuser.me/api/portraits/lego/6.jpg'
    ]
  };

  handleChange = (e) => {
    console.log('handle change:', e.target.value);
    this.setState({ value: e.target.value });
  };

  handleUpload = (e) => {
    console.log('loading...', e);
    const values = e.target.value;
    console.log('values:', values);
    // return weiboUploadMediaAdapter(e);
    return new Promise((resolve) => {
      setTimeout(() => {
        const urls = nx.times(
          values.length,
          (idx) => `https://randomuser.me/api/portraits/lego/${idx + 1}.jpg`
        );
        console.log('done', urls);
        resolve(urls);
      }, 2000);
    });
    // console.log('upload info:', e.target.value);
  };

  render () {
    return (
      <ReactDemokit
        className='p-3 app-container'
        url='https://github.com/afeiship/react-upload-media'>
        <ReactUploadMedia
          count={4}
          value={this.state.value}
          onChange={this.handleChange}
          onUpload={weiboUploadMediaAdapter}
        />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
