import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchCircuitData } from '../store';

class Home extends React.Component {
  componentDidMount() {
    if (this.props.circuits.length <= 0) {
      this.props.fetchCircuitData();
    }
  }

  render() {
    const { circuits } = this.props;

    const circuitsList = circuits.map(({ circuitId, circuitName, Location }) => (
      <li key={ circuitId } >{ circuitName } - { Location.locality }, { Location.country }</li>
    ));

    return (
      <div>
        <Helmet>
          <title>Circuits</title>
          <meta name="description" content="This is a proof of concept for React SSR, Home" />
        </Helmet>
        
        <h2>F1 2018 Season Calendar</h2>
        <ul>{ circuitsList }</ul>
      </div>
    );
  }
}

Home.serverFetch = fetchCircuitData; // static declaration of data requirements

const mapStateToProps = state => ({
  circuits: state.circuitData,
});

const mapDispatchToProps = {
  fetchCircuitData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
