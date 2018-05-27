import React, { Component } from 'react';
import spinner from './img/spinner.svg';
import NewsButton from './NewsButton'

const url = process.env.NODE_ENV === 'production'
  ? `https://media-ai-hackathon.herokuapp.com/news`
  : 'http://localhost:3000/news';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: false,
      selected: {},
      query: 'Playmobil',
      limit: 10,
    };
    this.getNews = this.getNews.bind(this);
    this.setNews = this.setNews.bind(this);
  }

  componentDidMount() {
    this.getNews();
  }

  pickNews(news) {
    const selected = this.state.selected;
    if (selected[news.id]) {
      delete selected[news.id];
    } else {
      selected[news.id] = news;
    }
    this.setState({ selected });
  }

  getNews() {
    const {
      loading,
      query,
      limit,
    } = this.state;

    if (loading) return;
    this.setState({ loading: true });
    fetch(`${url}?q=${query}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ news: data.documents, loading: false, selected: data.selected || {} });
      });
  }

  setNews() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ news: this.state.selected })
    });

    fetch(request)
      .then(response => response.json())
      .then(console.log);
  }
  handleLimitChange = (e) => {
    this.setState({ limit: e.target.value });
  };

  handleQueryChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.getNews();
    }
  };

  render() {
    const {
      limit,
      query,
      loading,
      selected,
      news,
    } = this.state;

    return (<div>
        <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">News</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <label for="limit">Limit: </label>
            <input
              className="form-control input-box"
              value={limit}
              onChange={this.handleLimitChange}
              id="limit"
              type="number"
            />
            <input
              className="form-control input-box"
              value={query}
              onChange={this.handleQueryChange}
              onKeyPress={this.handleKeyPress}
              type="text"
            />
            <button
              onClick={this.getNews}
              className="btn btn-sm btn-outline-secondary"
              disabled={loading}>Refresh
            </button>
            &nbsp;
            <button
              onClick={this.setNews}
              className="btn btn-sm btn-outline-success"
              disabled={loading || Object.keys(selected).length === 0}>Save
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <h4 className="h4">Suggestions</h4>
            <div className="list-group">
              {
                loading ? <center><img src={spinner} alt=''/></center> :
                  news.map(news =>
                    <NewsButton
                      key={news.id} news={news}
                      active={selected[news.id]}
                      click={this.pickNews.bind(this, news)}
                    />)
              }
            </div>
          </div>
          <div className="col-sm">
            <h4 className="h4">Selected</h4>
            <div className="list-group">
              {
                Object.keys(selected).map(k =>
                  <NewsButton
                    key={k}
                    news={selected[k]}
                    active={selected[selected[k].id]}
                    click={this.pickNews.bind(this, selected[k])}
                  />)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Product;
