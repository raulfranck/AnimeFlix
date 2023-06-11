'use client'
import { useEffect, useState } from "react";
import { CustomCard } from "./Components/CustomCard";
import axios from "axios";
import { Input, Pagination, Spin } from "antd";


export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  interface Movie {
    id: string;
    attributes: {
      titles: {
        en_jp: string;
      };
      posterImage: {
        medium: string;
      };
      synopsis: string;
    };
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=${(currentPage - 1) * 10}`
        );
        setMovies(response.data.data);
        setTotalMovies(response.data.meta.count);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0&filter[text]=${searchTerm}`
        );
        setSearchMovies(response.data.data);
        setTotalMovies(response.data.meta.count);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (searchTerm !== "") {
      searchMovies();
    } else {
      setSearchMovies([]);
    }
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    if (value === "") {
      setSearchMovies([]);
      setTotalMovies(movies.length);
    }
  };

  const renderMovieList = () => {
    if (searchTerm !== "") {
      return searchMovies.map((movie) => (
        <CustomCard key={movie.id} movie={movie} />
      ));
    } else {
      return movies.map((movie) => (
        <CustomCard key={movie.id} movie={movie} />
      ));
    }
  };

  return (
    <div className="global-container">
      <h1 className="global-title">Lista de Filmes</h1>
      <Input
        className="global-input"
        placeholder="Pesquisar Filme"
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <ul>
        {loading ? (
          <div className="loader">
            <Spin size="large" />
          </div>
        ) : (
          <div className="center-items cards-container">
            {renderMovieList()}
          </div>
        )}
      </ul>
      <Pagination
        className="pagination"
        current={currentPage}
        pageSize={10}
        total={totalMovies}
        onChange={handlePageChange}
      />
    </div>
  );
}