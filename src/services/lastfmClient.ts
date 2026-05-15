// src/services/lastfmClient.ts

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

export async function getLastfmRecommendations(artist: string, trackName: string, limit: number = 3) {
  // Last.fm's "getSimilar" endpoint is perfect for our Seed Track logic
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getSimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}&api_key=${API_KEY}&format=json&limit=${limit}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.similartracks || !data.similartracks.track) {
    return []; // Graceful fallback if no matches are found
  }

  // Format Last.fm's raw data to look EXACTLY like your Supabase data
  return data.similartracks.track.map((track: any, index: number) => ({
    id: `lastfm-${Date.now()}-${index}`, // Generate a unique frontend ID
    track_id: track.mbid || `lastfm-${index}`, 
    track_name: track.name,
    artists: track.artist.name,
    track_genre: 'External API', // Flag to let the UI know this is from the Sub-Brain
    similarity: 'Sub-Brain', 
    url_youtube: null, 
    external_url: track.url,
    // Last.fm provides an array of image sizes; grab the large one (index 2)
    album_art: track.image && track.image.length > 2 ? track.image[2]['#text'] : null 
  }));
}