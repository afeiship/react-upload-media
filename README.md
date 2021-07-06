# react-upload-media
> Customized uploader for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-upload-media
```

## properties
| Name      | Type   | Required | Default        | Description                           |
| --------- | ------ | -------- | -------------- | ------------------------------------- |
| className | string | false    | -              | The extended className for component. |
| fileProps | object | false    | -              | Input.file props.                     |
| value     | array  | false    | []             | The changed value.                    |
| count     | number | false    | -              | The line count.                       |
| onChange  | func   | false    | noop           | The change handler.                   |
| onUpload  | func   | false    | Promise.resove | The handler when file upload.         |


## usage
1. import css
  ```scss
  @import "~@jswork/wsui-frame-wrapper/dist/index.scss";
  @import "~@jswork/react-fade-image/dist/style.scss";
  @import "~@jswork/react-upload-self/dist/style.scss";
  @import "~@jswork/react-upload-media/dist/style.scss";
  @import '~@jswork/wsui-em-justify-list/dist/index.scss';

  // customize your styles:
  $react-upload-media-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactUploadMedia from '@jswork/react-upload-media';
  import './assets/style.scss';

  import '@jswork/next-times';

  class App extends React.Component {
    state = {
      value2:[],
      value: [
        'https://tva1.sinaimg.cn/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg',
        'https://tva1.sinaimg.cn/large/008i3skNgy1gqh868msafj302s02st8l.jpg',
        'https://randomuser.me/api/portraits/lego/1.jpg',
        'https://randomuser.me/api/portraits/lego/2.jpg',
        'https://randomuser.me/api/portraits/lego/3.jpg',
        'https://randomuser.me/api/portraits/lego/4.jpg',
        'https://randomuser.me/api/portraits/lego/5.jpg',
        'https://randomuser.me/api/portraits/lego/6.jpg',
      ]
    };

    handleChange = (e) => {
      console.log('handle change:',e.target.value);
      this.setState({ value: e.target.value });
    };

    handleUpload = (e) => {
      console.log('loading...');
      const values = e.target.value;
      console.log('values:', values);
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

    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-upload-media">
          <ReactUploadMedia
            count={4}
            value={this.state.value}
            onChange={this.handleChange}
            onUpload={this.handleUpload}
          />
        </ReactDemokit>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-upload-media/


## license
Code released under [the MIT license](https://github.com/afeiship/react-upload-media/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-upload-media
[version-url]: https://npmjs.org/package/@jswork/react-upload-media

[license-image]: https://img.shields.io/npm/l/@jswork/react-upload-media
[license-url]: https://github.com/afeiship/react-upload-media/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-upload-media
[size-url]: https://github.com/afeiship/react-upload-media/blob/master/dist/react-upload-media.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-upload-media
[download-url]: https://www.npmjs.com/package/@jswork/react-upload-media
