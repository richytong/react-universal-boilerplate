import fetch from 'isomorphic-fetch';

export const fetchCircuits = async () => {
  const res = await fetch('http://ergast.com/api/f1/2018/circuits.json');
  const jsonData = await res.json();
  return jsonData.MRData.CircuitTable.Circuits;
};

export const fetchTopAnime = async () => {
  const res = await fetch('https://api.jikan.moe/top/anime');
  const jsonData = await res.json();
  return jsonData.top;
};
