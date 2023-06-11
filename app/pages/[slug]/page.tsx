'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Spin } from 'antd';


interface detailMovieProps {
  params: {
    slug: string;
  };
}

interface MovieData {
  id: string;
  attributes: {
    titles: {
      en_jp: string;
    };
    posterImage: {
      medium: string;
    };
    synopsis: string;
    youtubeVideoId: string;
    ageRatingGuide: string;
    endDate: string;
    averageRating: string;
  };
}

interface Movie {
  data: MovieData;
}

export default function Details({ params }: detailMovieProps) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime/${params.slug}`
        );
        setMovie(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    if (params.slug) {
      fetchMovieDetails();
    }
  }, [params.slug]);

  if (!movie) {
    return <div className="loader"><Spin size="large" /></div>;
  }

  return (
    <div className='global-container'>
      <h1 className='global-title'>{movie.data.attributes.titles.en_jp}</h1>
      <div className='react-player'>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${movie.data.attributes.youtubeVideoId}`}
          controls
        />
      </div>
      <div className='movie-content'>
        <h2>Sinopse</h2>
        <p>{movie.data.attributes.synopsis}</p>

        <h2>Avaliação</h2>
        <p>{movie.data.attributes.averageRating}%</p>

        <h2>Faixa Etária</h2>
        <p>{movie.data.attributes.ageRatingGuide}</p>

        <h2>Lançamento</h2>
        <p>{movie.data.attributes.endDate}</p>
      </div>
    </div>
  );
}