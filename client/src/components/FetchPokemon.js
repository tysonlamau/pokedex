import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getPokemon } from '../actions/pokemons';
import { listPokemon } from '../actions/list';
import Pokemon from './Pokemon';
import AddPokemon from './AddPokemon';
import { Loader, Dimmer } from 'semantic-ui-react';

class FetchPokemon extends React.Component {
  state = { loaded: false };

  componentDidMount() {
    this.props.dispatch(
      getPokemon(this.setLoaded),
      listPokemon(),
    );
  }

  setLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    if (loaded) {
      return (
        <div>
          <Route
            exact
            path="/pokedex"
            component={Pokemon}
          />
          <Route
            exact
            path="/pokedex/add"
            component={AddPokemon}
          />
        </div>
      );
    } else {
      return (
        <Dimmer active>
          <Loader>Finding your Pokédex...</Loader>
        </Dimmer>
      );
    }
  }
}

export default connect()(FetchPokemon);
