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
    onChange: noop,
    onUpload: Promise.resove,
    fileProps: {
      accept: 'image/*'
    }
  };

  constructor(inProps) {
    super(inProps);
    this.notify = noop;
    this.state = {
      value: inProps.value
    };
  }

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleInit = ({ notify }) => {
    this.notify = notify;
  };

  template = ({ item, index, items }, cb) => {
    const { value } = this.state;
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
            this.notify();

            onUpload({ target }).then((res) => {
              value[index] = res[0];
              this.setState({ value });
              this.notify();
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
            const { value } = this.state;
            const { onUpload } = this.props;
            const blobs = inEvent.target.value.map((item) => item.url);
            const urls = value.concat(blobs);
            blobs.forEach((blob) => items.push(blob));
            this.setState({ value: urls });
            this.notify();
            onUpload(inEvent).then((res) => {
              const count = blobs.length;
              urls.splice(urls.length - count, count, ...res);
              this.setState({ value: urls });
              this.notify();
            });
          }}
          {...fileProps}
        />
        <span className="is-placeholder">点击上传 ϔ</span>
      </div>
    );
  };

  render() {
    const { className, value, onUpload, fileProps, ...props } = this.props;
    const _value = this.state.value;

    return (
      <ReactInteractiveList
        min={0}
        virtual
        items={_value}
        template={this.template}
        templateCreate={this.templateCreate}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        onInit={this.handleInit}
        {...props}
      />
    );
  }
}
