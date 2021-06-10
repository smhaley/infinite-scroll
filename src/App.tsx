import React from "react";
import styled from "styled-components";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
// import {useInfiniteScroll, useIntersectionObserver} from './hooks'

const Card = styled.div`
  margin: 20px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  max-width: 250px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  img {
    width: 100%;
  }
`;

const CardContainer = styled.div`
  padding: 2px 16px;
  min-height: 160px;
`;

const Button = styled.button`
  text-align: center;
  background: lightblue;
  color: blue;
  font-size: 1.1em;
  padding: 0.5em 0.7em;
  border: 1px solid blue;
  border-radius: 2px;
  transition: 0.1s ease-in-out;
  &:active {
    color: lightblue;
    background-color: blue;
  }
`;

interface CharacterVars {
  page: number;
}

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const RickContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

interface Info {
  next: number;
}

interface Location {
  name: string;
}

interface Result {
  id: string;
  name: string;
  image: string;
  status: string;
  location: Location;
}

interface Characters {
  info: Info;
  results: Result[];
}

interface CharacteryData {
  characters: Characters;
}

const GET_CHARACTERS = gql`
  query getChars($page: Int) {
    characters(page: $page) {
      info {
        __typename
      next
    }
      results {
        id
        name
        image
        status
        location {
          name
        }
      }
    }
  }
`;

function CharacterList() {

  const { loading, data, fetchMore } = useQuery<CharacteryData, CharacterVars>(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
    }
  );

  const getMore = () => {
    if (data) {
      const { next } = data.characters.info;
      console.log(next);
      data &&
        fetchMore({
          variables: { page: next},
        });
    }
  };

  return (
    <div>
      <h3>Slick Rick.</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <RickContainer>
            {data &&
              data.characters.results.map((val) => (
                <Card key={val.id + val.name}>
                  <img src={val.image} alt={val.name}></img>
                  <CardContainer key={val.id + val.name + "container"}>
                    <h4>
                      <b>{val.name}</b>
                    </h4>
                    <p>
                      <b>Status:</b> {val.status}
                    </p>
                    <p>
                      <b>Location:</b> {val.location.name}
                    </p>
                  </CardContainer>
                </Card>
              ))}
          </RickContainer>
          <Button type="button" onClick={getMore}>
            Get More
          </Button>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AppContainer>
      <RickContainer>
        <CharacterList />
      </RickContainer>
    </AppContainer>
  );
}

export default App;
