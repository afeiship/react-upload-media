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
| Name      | Type   | Required | Default | Description                           |
| --------- | ------ | -------- | ------- | ------------------------------------- |
| className | string | false    | -       | The extended className for component. |
| value     | object | false    | null    | The changed value.                    |
| onChange  | func   | false    | noop    | The change handler.                   |


## usage
1. import css
  ```scss
  @import "~@jswork/react-upload-media/dist/style.css";

  // or use sass
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
    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-upload-media">
          <ReactUploadMedia className="mb-5 has-text-white" />
          <button className="button is-primary is-fullwidth">Start~</button>
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
