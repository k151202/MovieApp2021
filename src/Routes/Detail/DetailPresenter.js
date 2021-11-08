import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Tabs from "Components/Tabs";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 65%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Homepage = styled.div`
  width: 40px;
  height: 20px;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.imdb});
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 70%;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | KhanFlix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | KhanFlix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Item>
              {result.imdb_id ? "" : <Divider>•</Divider>}
              {result.imdb_id ? (
                <a href={`https://imdb.com/title/${result.imdb_id}`}>
                  <Homepage
                    imdb={require("../../assets/imdb.png").default}
                  ></Homepage>
                </a>
              ) : (
                <a href={result.homepage}>Link</a>
              )}
            </Item>
          </ItemContainer>
          <ItemContainer>
            {result.seasons ? (
              <Tabs>
                <div label="Overview">
                  <Overview>{result.overview}</Overview>
                </div>
                <div label="Production">
                  {result.production_companies
                    ? result.production_companies.map((company) => (
                        <li key={company.id}>{company.name}</li>
                      ))
                    : ""}
                </div>
                <div label="Seasons">
                  {result.seasons.map((season) => (
                    <div className="season" key={season.id}>
                      <img
                        src={
                          season.poster_path
                            ? `https://image.tmdb.org/t/p/w154${season.poster_path}`
                            : require("../../assets/noPosterSmall.png").default
                        }
                      />
                      <div>{season.name}</div>
                    </div>
                  ))}
                </div>
                <div label="Trailer">
                  <div className="video-responsive">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${
                        result.videos.results[result.videos.results.length - 1]
                          .key
                      }`}
                      frameBorder="0"
                    />
                  </div>
                </div>
              </Tabs>
            ) : (
              <Tabs>
                <div label="Overview">
                  <Overview>{result.overview}</Overview>
                </div>
                <div label="Production">
                  {result.production_companies
                    ? result.production_companies.map((company) => (
                        <li key={company.id}>{company.name}</li>
                      ))
                    : ""}
                </div>
                <div label="Trailer">
                  <div className="video-responsive">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${
                        result.videos.results[result.videos.results.length - 1]
                          .key
                      }`}
                      frameBorder="0"
                    />
                  </div>
                </div>
              </Tabs>
            )}
          </ItemContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
