import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchAnimeDetailData, resetAnimeDetailData } from '../store';
import NotFound from './NotFound';

const exists = val => typeof val !== 'undefined';

class AnimeDetail extends React.Component {
  componentDidMount() {
    if (!exists(this.props.animeDetail)) {
      const { malId } = this.props.match.params;
      this.props.fetchAnimeDetailData({ malId });
    }
  }

  componentWillUnmount() {
    this.props.resetAnimeDetailData();
  }

  render() {
    const { animeDetail = {}, match = {}} = this.props;
    const { malId } = match.params;

    const {
      title,
      episodes,
      status,
      synopsis,
      background,
      linkCanonical,
      imageUrl,
      openingThemes = [],
      endingThemes = [],
      error,
    } = animeDetail;

    if (error) {
      if (this.props.staticContext) { // this will be undefined on the client
        this.props.staticContext.status = 404;
      }
      return <NotFound />;
    }

    const openingThemesList = openingThemes.map(openingTheme => <li key={ openingTheme }>{ openingTheme }</li>);
    const endingThemesList = endingThemes.map(endingTheme => <li key={ endingTheme }>{ endingTheme }</li>);

    return (
      <div>
        <Helmet>
          <title>{ `Top Anime: ${title ? title : ''}` }</title>
          <meta name="description" content={ title } />
        </Helmet>

        <h2><a href={ linkCanonical }>{ title }</a></h2>
        <img src={ imageUrl } />
        { episodes && <p>Episodes: { episodes }</p> }
        { status && <p>Status: { status }</p> }
        { synopsis && <p>Synopsis:</p> }
        <p>{ synopsis }</p>
        { background && <p>Background:</p> }
        <p>{ background }</p>
        { openingThemesList.length > 0 && <p>Opening themes:</p> }
        <ul>{ openingThemesList }</ul>
        { endingThemesList.length > 0 && <p>Ending themes:</p> }
        <ul>{ endingThemesList }</ul>
      </div>
    );
  }
}

AnimeDetail.dataFetch = fetchAnimeDetailData;

const mapStateToProps = state => ({
  animeDetail: state.animeDetail.data,
});

const mapDispatchToProps = {
  fetchAnimeDetailData,
  resetAnimeDetailData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeDetail);
