import React, { useRef, useEffect, useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { useIntersectionObserver } from "./hooks";
import {
  Nav,
  NavLogo,
  Heading,
  ContentContainer,
  FooterDiv,
  NavSource,
} from "./App.styled";
import CharacterList from "./components/CharacterList";
import { CharacterData, CharacterVars } from "./types";
import { GET_CHARACTERS } from "./apollo";
import { ReactComponent as GraphQL } from "./graphql.svg";

const content = {
  logo: "Slick Rick.",
  source: (
    <a
      href="https://rickandmortyapi.com/graphql"
      target="_blank"
      rel="noreferrer"
    >
      <GraphQL />
    </a>
  ),
  stack: {
    head: "Infinite Scroll using:",
    stack: ["Apollo Client V3", "Intersection Observer"],
  },
  footer: {
    done: "That's All!",
    more: "There's Still More!",
  },
};

const App = () => {
  const [stop, setStop] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { loading, data, fetchMore, networkStatus } = useQuery<
    CharacterData,
    CharacterVars
  >(GET_CHARACTERS, {
    variables: { page: 1 },

    notifyOnNetworkStatusChange: true,
  });

  const isRefetching = networkStatus === 3;

  const getMore = useCallback(() => {
    if (data) {
      const { next } = data.characters.info;
      if (data && next && !loading && !isRefetching) {
        fetchMore({
          variables: { page: next },
        });
      } else if (!next) {
        setStop(true);
      }
    }
  }, [data, loading, fetchMore, isRefetching]);

  useEffect(() => {
    if (isVisible) {
      getMore();
    }
  }, [isVisible, getMore]);

  return (
    <>
      <Nav>
        <NavLogo>{content.logo}</NavLogo>
        <NavSource>{content.source}</NavSource>
      </Nav>
      <Heading>
        {content.stack.head}
        <ul>
          {content.stack.stack.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Heading>
      <ContentContainer>
        <CharacterList networkStatus={networkStatus} data={data} />
      </ContentContainer>
      {stop ? (
        <FooterDiv>{content.footer.done}</FooterDiv>
      ) : (
        <FooterDiv ref={ref}>{content.footer.more}</FooterDiv>
      )}
    </>
  );
};

export default App;
