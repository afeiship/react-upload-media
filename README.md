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
| value     | array  | false    | []             | The changed value.                    |
| onChange  | func   | false    | noop           | The change handler.                   |
| onUpload  | func   | false    | Promise.resove | The handler when file upload.         |


## usage
1. import css
  ```scss
  @import "~@jswork/wsui-frame-wrapper/dist/index.scss";
  @import "~@jswork/react-fade-image/dist/style.scss";
  @import "~@jswork/react-upload-self/dist/style.scss";
  @import "~@jswork/react-upload-media/dist/style.scss";

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
