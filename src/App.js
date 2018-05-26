import React, { Component, Fragment } from 'react';
import './App.css';
import Nav from './Nav';
import Product from './Product';
import News from './News';
import LeftNav from './LeftNav';

class App extends Component {
  render() {
    return (<Fragment>
      <Nav />
      <div className="container-fluid">
      <div className="row">
        <LeftNav />

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <button className="btn btn-sm btn-outline-secondary">Share</button>
                <button className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
            </div>
          </div>
          <Product />
          <hr />
          <News />

        </main>
      </div>
    </div>
    </Fragment>);
  }
}

export default App;
