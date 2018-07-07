import fetch from 'isomorphic-fetch';

export const fetchTopAnime = async (page) => {
  const res = await fetch(`https://api.jikan.moe/top/anime/${page}`);
  const data = await res.json();
  return data.top.map(({ rank, title, mal_id, image_url }) => ({
    rank,
    title,
    malId: mal_id,
    imageUrl: image_url,
  }));
};

export const fetchAnimeDetail = async (malId) => {
  const res = await fetch(`https://api.jikan.moe/anime/${malId}`);

  const {
    title,
    episodes,
    status,
    synopsis,
    background,
    error,
    link_canonical: linkCanonical,
    image_url: imageUrl,
    opening_theme: openingThemes,
    ending_theme: endingThemes,
  } = await res.json();

  return {
    title,
    episodes,
    status,
    synopsis,
    background,
    linkCanonical,
    imageUrl,
    openingThemes,
    endingThemes,
    error,
  };
};
