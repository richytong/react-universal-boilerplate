import fetch from 'isomorphic-fetch';

export const fetchTopAnime = async () => {
  const res = await fetch('https://api.jikan.moe/top/anime');
  const jsonData = await res.json();
  return jsonData.top;
};

export const fetchAnimeDetail = async (malId) => {
  const res = await fetch(`https://api.jikan.moe/anime/${malId}`);
  const jsonData = await res.json();

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
  } = jsonData;

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
