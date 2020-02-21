import React, { Component } from "react";
import Header from "./Header";

export default class App extends Component {
  state = {
    offset: 0,
    pokemon: {
      results: []
    }
  };

  componentDidMount() {
    this.fetchPokemon();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.fetchPokemon();
    }
  }

  fetchPokemon = () => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${this.state.offset}&limit=12`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ pokemon: json });
      });
  };

  updateOffset = num => {
    this.setState(prevState => {
      return { offset: prevState.offset + num };
    });
  };

  render() {
    return (
      <div className="App">
        <Header />

        <main id="main-content">
          <ul>
            {this.state.pokemon.results.map(poke => (
              <li className="poke-card" key={poke.name}>
                <h3>{poke.name}</h3>
              </li>
            ))}
          </ul>
          <button
            id="previous"
            className="btn"
            onClick={() => this.updateOffset(-12)}
          >
            Previous
          </button>
          <button
            id="next"
            className="btn"
            onClick={() => this.updateOffset(12)}
          >
            Next
          </button>
        </main>
        <img
          id="pikachu"
          className="hvr-hang"
          src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png"
          alt="Pikachu"
        />
      </div>
    );
  }
}
