import React, { Component } from "react";
import Header from "./Header";
export default class App extends Component {
  state = {
    pokemon: {
      results: []
    },
    pokeDetails: { name: "", powers: [], sprites: {} },
    isInfoShowing: false
  };

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = async (
    url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12"
  ) => {
    const res = await fetch(url);
    const pokes = await res.json();
    this.setState({ pokemon: pokes });
    console.log(pokes);
  };

  fetchDetails = async name => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    ).catch(error => console.log(error));
    const json = await res.json();
    console.log(json);
    this.setState({ pokeDetails: json, isInfoShowing: true });
  };

  next = () => {
    if (!this.state.pokemon.next) return;
    this.fetchPokemon(this.state.pokemon.next);
    // console.log("next");
  };

  previous = () => {
    if (!this.state.pokemon.previous) return;
    this.fetchPokemon(this.state.pokemon.previous);
    // console.log("previous");
  };

  handleClose = () => {
    this.setState({ isInfoShowing: false });
  };

  render() {
    const { pokeDetails, pokemon, isInfoShowing } = this.state;
    return (
      <div className="App">
        <Header />

        <main id="main-content">
          {isInfoShowing ? (
            <div className="poke-card info">
              <img src={pokeDetails.sprites.front_default} alt="" />
              <h2>{pokeDetails.name}</h2>
              {pokeDetails.abilities.map(ability => (
                <h4>{ability.ability.name}</h4>
              ))}
              <button onClick={this.handleClose}>Close</button>
            </div>
          ) : (
            <>
              <ul>
                {pokemon.results.map(poke => (
                  <li
                    className="poke-card"
                    key={poke.name}
                    onClick={() => this.fetchDetails(poke.name)}
                  >
                    <h3>{poke.name}</h3>
                  </li>
                ))}
              </ul>
              <button id="previous" className="btn" onClick={this.previous}>
                Previous
              </button>
              <button id="next" className="btn" onClick={this.next}>
                Next
              </button>
            </>
          )}
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
