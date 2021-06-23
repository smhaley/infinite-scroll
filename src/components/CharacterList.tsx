import React, { useRef, useState } from "react";
import { CardContainer, RickContainer, Card } from "./CharacterList.styled";
import { CharacterData } from "../types";

interface Props {
  networkStatus: number;
  data: CharacterData | undefined;
}

const CharacterList: React.FC<Props> = ({ networkStatus, data }) => {
  const [counter, setCounter] = useState(0);
  const lenRef = useRef(0);

  const handleShow = () => {
    lenRef.current++;
    data &&
      lenRef.current === data.characters.results.length &&
      setCounter(lenRef.current);
  };

  return (
    <div>
      {networkStatus === 1 ? (
        <p>loading ...</p>
      ) : (
        <>
          <RickContainer>
            {data &&
              data.characters.results.map((val, index) => (
                <Card
                  key={val.id + val.name + "card"}
                  style={{ display: index < counter ? "block" : "none" }}
                >
                  <img onLoad={handleShow} src={val.image} alt={val.name} />
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

export default CharacterList;
