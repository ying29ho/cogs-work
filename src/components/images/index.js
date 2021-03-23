import React, { useState } from "react";
import "./images.css";
import styled from "styled-components";

const Container = styled.div`
  max-width: 25rem;
`;

const ImageCarousel = ({ arrays }) => {
  const [main, setMain] = useState(arrays[0].node);
  const handleOnClick = (props) => {
    setMain(props);
  };
  return (
    <Container>
      <img className="image-main" src={main.originalSrc} alt={main.alt} />
      {arrays.map(({node}) => (
        <img
          className="image-secondary"
          key={node.id}
          onClick={() => handleOnClick(node)}
          src={node.originalSrc}
          alt={node.alt}
        />
      ))}
    </Container>
  );
};

export default ImageCarousel;
