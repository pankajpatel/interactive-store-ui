import React, { Component } from 'react';
import { format } from 'date-fns';
const style = {maxHeight: '250px', overflow: 'auto'};

const RawHTML = ({children, className = ""}) => 
<div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />

class NewsButton extends Component {
  render() {
    const news = this.props.news;
    return ( <button
      onClick={this.props.click} style={style}
      className={`list-group-item list-group-item-action ${this.props.active ? 'list-group-item-success' : ''}`} >
        <div className="d-block w-100 clearfix">
          <small className="text-muted float-right">{format(news.dateCreated, 'DD/MM/YYYY HH:mm:ss')}</small>
          <small className="text-muted">
            <a target="_blank" rel="noopener noreferrer" href={news.url}>{news.url}</a>
          </small>
        </div>
        <div className="mb-1">
          <RawHTML>{news.content || ''}</RawHTML>
        </div>
        {news.author ? <span className="mb-1">
          By <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${news.author}`}>@{news.author}</a>
        </span> : ''}
      </button>
    );
  }
}

export default NewsButton;
