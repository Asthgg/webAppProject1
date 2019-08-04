import React, { Component } from 'react';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      visitas: ''
    };
  }

  fetchVisits() {
    fetch('/api/visitas')
      .then(res => res.json())
      .then(data => {
        this.setState({visitas: data});
        console.log(this.state.visitas);
      });
  }

  componentDidMount() {
    this.fetchVisits();
  }
    render(props){
        return(
            <div class="row">
            <div class="col s4 m6">
              <div class="card blue-darken-1">
                <div class="card-content black-text">
                  <span class="card-title">Contador de visitas:</span>
                  <p>{this.state.visitas}</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Footer;