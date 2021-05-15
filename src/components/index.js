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
     * The changed value.
     */
    value: PropTypes.array,
    /**
     * The change handler.
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    onChange: noop
  };

  constructor(inProps) {
    super(inProps);
    this.notify = noop;
    this.state = {
      value: inProps.value
    };
  }

  shouldComponentUpdate(inProps) {
    const { value } = this.state;
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleInit = ({ notify }) => {
    this.notify = notify;
  };

  handleChange = (inEvent) => {
    const { value } = this.state;
    const { blobs } = inEvent.target.value;
    const _value = value.concat(blobs);
    this.setState({ value: _value });
    this.notify();
  };

  template = ({ item, index, items, change }, cb) => {
    return (
      <div className="is-item is-image" key={index}>
        <ReactUploadSelf
          key={index}
          value={item}
          onChange={(e) => {
            items[index] = e.target.value;
            this.notify();
          }}
        />
        <button className="is-action is-remove" onClick={cb}>
          X
        </button>
      </div>
    );
  };

  templateCreate = ({ change }, cb) => {
    const { className, onChange, value, ...props } = this.props;
    return (
      <div className="is-item is-uploader">
        <ReactUpload
          multiple
          className="is-form-control"
          onChange={this.handleChange}
          {...props}
        />
        <span className="is-placeholder">点击上传 ϔ</span>
      </div>
    );
  };

  render() {
    const { className, value, ...props } = this.props;
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
