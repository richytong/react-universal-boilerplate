import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchAnimeData } from '../store';

class Anime extends React.Component {
  componentDidMount() {
    if (this.props.topAnime.length <= 0) {
      this.props.fetchAnimeData();
    }
  }

  render() {
    const { topAnime } = this.props;

    const topAnimeList = topAnime.map(({ mal_id, rank, title, url, image_url }) => (
      <li key={ mal_id }>
        <p>{ rank } | <a href={url}>{title}</a></p>
        <img src={ image_url } />
      </li>
    ));

    return (
      <div>
        <Helmet>
          <title>Top Anime</title>
          <meta name="description" content="my-anime-list top anime" />
        </Helmet>

        <h2>My Anime List Top Anime</h2>
        <ul>{ topAnimeList }</ul>
      </div>
    );
  }
}

Anime.serverFetch = fetchAnimeData;

const mapStateToProps = state => ({
  topAnime: state.topAnime,
});

const mapDispatchToProps = {
  fetchAnimeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Anime);
