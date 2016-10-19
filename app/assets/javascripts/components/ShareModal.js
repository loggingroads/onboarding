import React, {Component} from 'react';

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyFailed: false,
      copied: false
    };
    this.handleClickModal = this.handleClickModal.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  handleClickModal(e) {
    if (e.target === e.currentTarget) {
      this.props.setShareModal(false);
    }
  }

  handleCopyClick() {
    try {
      this.url.select();
      const isEnabled = document.queryCommandEnabled('copy');
      const successful = document.execCommand('copy');

      if (isEnabled && successful) {
        this.setState({
          copied: true
        });
      } else {
        this.setState({
          copyFailed: true
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.onKeyPress = e => {
      if (e.keyCode === 27) {
        this.props.setShareModal(false);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  render() {
    const currentUrl = window.location.href;
    let copyText;
    if (this.state.copyFailed) {
      copyText = 'Now press ⌘ + C to copy';
    }
    let btnText;
    if (this.state.copied) {
      btnText = 'copied';
    } else {
      btnText = 'copy';
    }
    if (!this.props.modalOpen) {
      return null;
    }
    return (
      <div className={`overlay`} onClick={this.handleClickModal}>
        <div className={`share-modal`}>
          <button className="btn" onClick={() => this.props.setShareModal(false)}>
            <svg className="icon icon-close">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
          <div className="title text text-module-subtitle -dark">
            Share this Page
          </div>
          <div className="text text-desc -dark">
            Copy and paste the link in email or IM
          </div>
          <div className="actions">
            <input ref={ref => this.url = ref} defaultValue={currentUrl} className="url"/>
            <button className="bttn bttn-primary" onClick={this.handleCopyClick}>{btnText}</button>
          </div>
          <div className="copy-text">
            {copyText}
          </div>
          <div className="share-links">
            <a href={`https://twitter.com/share?url=${currentUrl}`} className="c-btn btn-link" target="_blank" rel="noopener noreferrer">
              <svg className={`icon icon-twitter`}>
                <use xlinkHref={`#icon-twitter`}></use>
              </svg>
            </a>
            <a href={`http://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} className="c-btn btn-link" target="_blank" rel="noopener noreferrer">
              <svg className={`icon icon-facebook`}>
                <use xlinkHref={`#icon-facebook`}></use>
              </svg>
            </a>
            <a href={`https://plus.google.com/share?url=${currentUrl}`} className="c-btn btn-link" target="_blank" rel="noopener noreferrer">
              <svg className={`icon icon-googleplus`}>
                <use xlinkHref={`#icon-googleplus`}></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ShareModal.propTypes = {
};

export default ShareModal;
