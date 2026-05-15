// src/services/spotifyClient.ts

// ⚠️ WARNING: For production, move this to a backend API route to hide your secret!
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export async function getSpotifyToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

export async function getSpotifyRecommendations(seedTrackId: string, limit: number = 3) {
  const token = await getSpotifyToken();

  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTrackId}&limit=${limit}`, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  const data = await response.json();
  
  // Format Spotify's raw data to look EXACTLY like your Supabase data
  const formattedSpotifyTracks = data.tracks.map((track: any) => ({
    id: track.id, 
    track_id: track.id,
    track_name: track.name,
    artists: track.artists.map((a: any) => a.name).join(', '),
    track_genre: 'Spotify Global', 
    similarity: 'Sub-Brain', // Fixed: Changed from match_score to similarity
    url_youtube: null, 
    external_url: track.external_urls?.spotify,
    album_art: track.album?.images[0]?.url
  }));

  return formattedSpotifyTracks;
}