import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useIntersectionObserver } from "./hooks";

export const Nav = styled.nav`
  background: #0147fa;
  height: 80px;
  display: flex;
  top: 0;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 70px;
  box-shadow: 0 8px 10px -8px rgba(0, 0, 0, 0.3);
`;

export const NavLogo = styled.div`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-left: 2rem;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 700;
`;

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

const Heading = styled.div`
  margin-top: 120px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 1.5rem;
  text-align: center;
`;

export const FooterDiv = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  position: relative;
  bottom: 0;
  left: 0;
  height: 60px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CardContainer = styled.div`
  padding: 2px 16px;
  min-height: 160px;
`;

interface CharacterVars {
  page: number;
}

const ContentContainer = styled.section`
  display: flex;
  padding: 50px;
  flex-direction: column;
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
  pages: number;
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
        pages
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

interface Props {
  loading: boolean;
  data: CharacteryData | undefined;
}

const CharacterList: React.FC<Props> = ({ loading, data }) => {
  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <RickContainer>
            {data &&
              data.characters.results.map((val) => (
                <Card key={val.id + val.name + "card"}>
                  <img src={val.image} alt={val.name} />
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
        </>
      )}
    </div>
  );
};

const App = () => {
  const [stop, setStop] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { loading, data, fetchMore } = useQuery<CharacteryData, CharacterVars>(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
    }
  );

  const getMore = useCallback(() => {
    if (data) {
      const { next } = data.characters.info;
      if (data && next && !loading) {
        fetchMore({
          variables: { page: next },
        });
      } else if (!next) {
        setStop(true);
      }
    }
  }, [data, loading, fetchMore]);

  useEffect(() => {
    if (isVisible) {
      getMore();
    }
  }, [isVisible, getMore]);

  return (
    <>
      <Nav>
        <NavLogo>Slick Rick.</NavLogo>
      </Nav>
      <Heading>
        Infinite Scroll using: <b>Appolo Client V3</b> &{" "}
        <b>Intersection Observer</b>
      </Heading>
      <ContentContainer>
        <CharacterList loading={loading} data={data} />
      </ContentContainer>
      {stop ? (
        <FooterDiv>That's All!</FooterDiv>
      ) : (
        <FooterDiv ref={ref}>Bottom</FooterDiv>
      )}
    </>
  );
};

export default App;
