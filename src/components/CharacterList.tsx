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
    data && console.log(lenRef.current, data.characters.results.length);
    data &&
      lenRef.current === data.characters.results.length &&
      setCounter(lenRef.current);
  };

  {
    networkStatus === 3 ||
      (data && lenRef.current === data.characters.results.length && (
        <p>Loading more ...</p>
      ));
  }

  console.log(data && data);
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
      {/* {networkStatus === 3 ||
        (data && lenRef.current  && (
          <div style={{ height: "500px", backgroundColor:'pink' }}>
            <p>Loading ...</p>{" "}
          </div>
        ))} */}
    </div>
  );
};

export default CharacterList;
