import React, { Component } from 'react';
import spinner from './spinner.svg';
import NewsButton from './NewsButton'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: false,
      selected: {}
    }
    this.getNews = this.getNews.bind(this);
    this.setNews = this.setNews.bind(this);
  }
  componentDidMount() {
    this.getNews();
  }
  pickNews(news) {
    const selected = this.state.selected;
    if(selected[news.id]) {
      delete selected[news.id];
    } else {
      selected[news.id] = news;
    }
    this.setState({selected});
  }
  getNews() {
    if(this.state.loading) return;
    this.setState({loading: true}) 
    fetch('//localhost:3000/news?q=Trump&limit=10')
      .then(response => response.json())
      .then(data => {
        this.setState({news: data.documents, loading: false, selected: data.selected || {}});
      });
  }
  setNews() {
    const url = '//localhost:3000/news'
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({news: this.state.selected})
    });

    fetch(request)
      .then(response => response.json())
      .then(console.log);
  }
  render() {
    return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">News</h1>
      <div className="btn-toolbar mb-2 mb-md-0">
        <button onClick={this.getNews} className="btn btn-sm btn-outline-secondary" disabled={this.state.loading} >Refresh</button>&nbsp;
        <button onClick={this.setNews} className="btn btn-sm btn-outline-success"
        disabled={this.state.loading || Object.keys(this.state.selected).length === 0} >Save</button>
      </div>
    </div>
    <div className="row">
      <div className="col-sm">
        <h4 className="h4">Suggestions</h4>
        <div className="list-group">
          {
            this.state.loading ? <center><img src={spinner} alt='' /></center> :
            this.state.news.map(news => <NewsButton key={news.id} news={news}
              active={this.state.selected[news.id]}
              click={this.pickNews.bind(this, news)} />)
          }
        </div>
      </div>
      <div className="col-sm">
        <h4 className="h4">Selected</h4>
        <div className="list-group">
          {
            Object.keys(this.state.selected).map(k => <NewsButton key={k}
              news={this.state.selected[k]}
              active={this.state.selected[this.state.selected[k].id]}
              click={this.pickNews.bind(this, this.state.selected[k])} />)
          }
        </div>
      </div>
    </div>
    </div>
    );
  }
}


export default Product;
