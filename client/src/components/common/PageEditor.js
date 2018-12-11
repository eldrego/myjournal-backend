import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';

class PageEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onUnderlineClick = this.onUnderlineClick.bind(this);
    this.onBoldClick = this.onBoldClick.bind(this);
    this.onItalicClick = this.onItalicClick.bind(this);
  }

  onChange(editorState) {
    this.setState({
      editorState
    });

    const content = this.state.editorState.getCurrentContent();
    this.props.contentHandler(convertToRaw(content));
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }


  render() {
    return (
      <div className="editorContainer">
        <button onClick={this.onUnderlineClick}>U</button>
        <button onClick={this.onBoldClick}><b>B</b></button>
        <button onClick={this.onItalicClick}><em>I</em></button>
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange= {this.onChange}
          />
        </div>
      </div>
    );
  }
}

PageEditor.propTypes = {
  contentHandler: PropTypes.func.isRequired,
};

export default PageEditor;
