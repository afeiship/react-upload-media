import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUploadMedia from '../src/main';
import './assets/style.scss';

class App extends React.Component {
  state = {
    value: [
      'https://tva1.sinaimg.cn/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg',
      'https://tva1.sinaimg.cn/large/008i3skNgy1gqh868msafj302s02st8l.jpg'
    ]
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    console.log('event;', e.target.value);
  };

  handleUpload = (e) => {
    console.log('update. e:', e.target.value);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          'https://randomuser.me/api/portraits/lego/1.jpg',
          'https://randomuser.me/api/portraits/lego/2.jpg',
        ]);
      }, 1000);
    });
    // console.log('upload info:', e.target.value);
  };

  render() {
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-upload-media">
        <ReactUploadMedia
          value={this.state.value}
          onChange={this.handleChange}
          onUpload={this.handleUpload}
        />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
