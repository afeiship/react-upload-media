import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactUpload from '@jswork/react-upload';
import ReactList from '@jswork/react-list';

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
    value: PropTypes.object,
    /**
     * The change handler.
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: noop
  };

  constructor(inProps) {
    super(inProps);
    this.state = {
      medias: []
    };
  }

  handleChange = (inEvent) => {
    const { medias } = this.state;
    const { blobs } = inEvent.target.value;
    this.setState({ medias: medias.concat(blobs) });
  };

  templateMedia = ({ item, index }) => {
    return (
      <div key={index} className="is-item">
        <img src={item} />
      </div>
    );
  };

  render() {
    const { className, onChange, ...props } = this.props;
    const { medias } = this.state;

    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}>
        <ReactList
          virtual
          items={medias}
          template={this.templateMedia}
          className="is-medias"
        />
        <div className="is-item is-uploader">
          <ReactUpload
            multiple
            className="is-form-control"
            onChange={this.handleChange}
            {...props}
          />
          <span className="is-placeholder">点击上传 ϔ</span>
        </div>
      </div>
    );
  }
}
