import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addArticle } from '../../actions/articleActions';

class ArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const article = {
      title: this.state.title,
      content: this.state.content,
    };

    this.props.addArticle(article);
  }

  render() {
    return (
      <div>
        Article Form
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" name="title"
              value={this.state.title} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label>Content</label>
            <input type="text" className="form-control" name="content"
              value={this.state.content} onChange={this.onChange}/>
          </div>
          <hr/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

ArticleForm.propTypes = {
  addArticle: PropTypes.func.isRequired
};

export default connect(null, { addArticle })(ArticleForm);
