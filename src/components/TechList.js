import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  }

  componentDidMount(){
    const techs = localStorage.getItem('techs')

    if(techs) {
      this.setState({ techs: JSON.parse(techs) })
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  componentWillUnmount() {

  }


  handleInputChange = e => {
    
    this.setState({ newTech: e.target.value });

  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.newTech);

    this.setState({ 
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    })

  }

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit   }>
        <h1>{this.state.newTech}</h1>
        <ul>
          { this.state.techs.map(tech => 
            <TechItem 
              tech={tech} 
              onDelete={() => this.handleDelete(tech)} 
              key={tech} 
            />
          ) }
        </ul>
        <input 
          type="text"
          value={this.state.newTech}
          onChange={ this.handleInputChange } 
        />
        <button type="submit">Adicionar</button>
      </form>
    );
  }
}
 
export default TechList;