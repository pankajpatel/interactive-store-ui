import React, { Component } from 'react';
const style = {display: 'flex', flexDirection: 'row', flexWrap: 'wrap'};
class Product extends Component {
  render() {
    return (
    <div className="card lead-product" style={style}>
      <div className="card-img-top hydrogen" style={{flex: '1 50%'}} >
        <img src={require('./51sRAnhFLXL.jpg')} alt='' width="100%"/>
      </div>
      <div className="card-body" style={{flex: '1 50%'}}>
        <h5 className="card-title">Playmobil 9218 Collectable Policeman and Burglar Duo Pack</h5>
        <h6 className="card-subtitle mb-2 text-muted">The Playmobil policeman and burglar duo pack comes with two characters from your favourite police range. The policeman has caught the burglar red-handed with his bag of stolen goods and takes him back to the station.</h6>
        <div className="card-text">
          <ul>
            <li>Features a Policeman catching a Burglar before he could get away</li>
            <li>Great addition to the City Action Range</li>
            <li>Age range 4+</li>
            <li>Great pocket money item</li>
            <li>Encourages learning through interactive play</li>
          </ul>
        </div>
        <a href="https://www.amazon.co.uk/Playmobil-9218-Collectable-Policeman-Burglar/dp/B01LX4T7OE/ref=pd_cp_21_1?_encoding=UTF8&pd_rd_i=B01LX4T7OE&pd_rd_r=790b99ad-60f4-11e8-82e1-2babc8b47a5f&pd_rd_w=WCymQ&pd_rd_wg=gdfx5&pf_rd_i=desktop-dp-sims&pf_rd_m=A3P5ROKL5A1OLE&pf_rd_p=3262852920272843952&pf_rd_r=6KDHJA8A7TXYV58A9H1Z&pf_rd_s=desktop-dp-sims&pf_rd_t=40701&psc=1&refRID=6KDHJA8A7TXYV58A9H1Z" target="_blank" rel="noopener noreferrer" className="btn btn-primary card-link">See Details</a>
      </div>
    </div>
    );
  }
}

export default Product;
