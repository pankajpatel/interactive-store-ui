import React, { Component } from 'react';
import { format } from 'date-fns';
const style = {};

const RawHTML = ({children, className = ""}) => 
<div className={className} dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br />')}} />

class NewsButton extends Component {
  render() {
    const news = this.props.news;
    let badgeType = 'primary';
    badgeType = news.sentiments.vote === 'positive' 
      ? 'success'
      : news.sentiments.vote === 'negative'
        ? 'danger'
        : badgeType;
    return ( <button
      onClick={this.props.click} style={style}
      className={`list-group-item list-group-item-action news-item ${this.props.active ? 'list-group-item-success' : ''}`} >
        <div className="d-block w-100 clearfix">
          <small className="text-muted float-right">{format(news.dateCreated, 'DD/MM/YYYY HH:mm:ss')}</small>
        </div>
        <div className="mb-1">
          <RawHTML>{news.content || ''}</RawHTML>
        </div>
        {news.author ? <span className="d-block mb-1">
          By <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${news.author}`}>@{news.author}</a>
        </span> : ''}

        <a target="_blank" rel="noopener noreferrer" href={news.url} className="badge badge-secondary float-right">Source</a>
        <span className={`badge badge-${badgeType} badge-vote`}>{news.sentiments.vote} <span className="badge badge-light">{news.sentiments.score}</span></span>
      </button>
    );
  }
}

export default NewsButton;
