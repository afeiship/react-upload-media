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

  handleUploadChange = (inEvent) => {
    const { value } = this.state;
    const { onUpload } = this.props;
    const { blobs } = inEvent.target.value;
    const _value = value.concat(blobs);
    this.setState({ value: _value });
    this.notify();
    onUpload(inEvent).then((res) => {
      const count = blobs.length;
      _value.splice(_value.length - count, count, ...res);
      this.setState({ value: _value });
      this.notify();
    });
  };

  template = ({ item, index, items, change }, cb) => {
    return (
      <div className="is-item is-image" key={index}>
        <ReactUploadSelf
          key={index}
          value={item}
          onChange={(e) => {
            const value = e.target.value;
            items[index] = value ? value.blobs[0] : null;
            this.notify();
          }}
        />
        <button type="button" className="is-action is-remove" onClick={cb}>
          X
        </button>
      </div>
    );
  };

  templateCreate = ({ change }, cb) => {
    const { accept } = this.props;
    return (
      <div className="is-item is-uploader">
        <ReactUpload
          multiple
          accept={accept}
          className="is-form-control"
          onChange={this.handleUploadChange}
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
        templateDefault={this.templateDefault}
        templateCreate={this.templateCreate}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        onInit={this.handleInit}
        {...props}
      />
    );
  }
}
