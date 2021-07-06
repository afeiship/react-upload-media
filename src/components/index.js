import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactUpload from '@jswork/react-upload';
import ReactInteractiveList from '@jswork/react-interactive-list';
import ReactUploadSelf from '@jswork/react-upload-self';

const CLASS_NAME = 'react-upload-media';

export default class ReactUploadMedia extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * Input.file props.
     */
    fileProps: PropTypes.object,
    /**
     * The changed value.
     */
    value: PropTypes.array,
    /**
     * Every line's count.
     */
    count: PropTypes.number,
    /**
     * The change handler.
     */
    onChange: PropTypes.func,
    /**
     * The handler when file upload.
     */
    onUpload: PropTypes.func
  };

  static defaultProps = {
    value: [],
    count: 5,
    onChange: noop,
    onUpload: Promise.resove,
    fileProps: { accept: 'image/*' }
  };

  template = ({ item, index, items }, cb) => {
    const { onUpload } = this.props;
    return (
      <div className="is-item is-image" key={index}>
        <ReactUploadSelf
          key={index}
          value={item}
          onChange={(e) => {
            const { url } = e.target.value;
            if (!url) return;
            const target = { value: [e.target.value] };
            items[index] = url;
            onUpload({ target }).then((res) => {
              items[index] = res[0];
              this.list.notify();
            });
          }}
        />
        <button type="button" className="is-action is-remove" onClick={cb}>
          X
        </button>
      </div>
    );
  };

  templateCreate = ({ items }) => {
    const { accept, fileProps } = this.props;
    return (
      <div className="is-item is-uploader">
        <ReactUpload
          multiple
          accept={accept}
          className="is-form-control"
          onChange={(inEvent) => {
            const { onUpload } = this.props;
            const blobs = inEvent.target.value.map((item) => item.url);
            blobs.forEach((blob) => items.push(blob));
            onUpload(inEvent).then((res) => {
              const count = blobs.length;
              items.splice(items.length - count, count, ...res);
              this.list.notify();
            });
          }}
          {...fileProps}
        />
        <span className="is-placeholder">
          点击上传 ϔ <br />
          Tips: 点击图片即可替换
        </span>
      </div>
    );
  };

  render() {
    const { className, value, count, onUpload, fileProps, ...props } = this.props;

    return (
      <ReactInteractiveList
        min={0}
        items={value}
        template={this.template}
        templateCreate={this.templateCreate}
        data-component={CLASS_NAME}
        data-count={count}
        className={classNames(CLASS_NAME, 'wsui-em-justify-list', className)}
        ref={(list) => (this.list = list)}
        {...props}
      />
    );
  }
}
