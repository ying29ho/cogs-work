import Card from "react-bootstrap/Card";
import Button from "../button";
import { Input } from "../form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./card.scss";

const MainContainer = styled.div`
  .Container {
    padding: 0px;
  }
  .card {
    min-width: 190px;
    height: 350px;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    .card {
      min-width: 150px;
      height: 300px;
    }
  }
`;

const ProductCard = ({ imgSrc, name, price, handle, productInfo }) => (
  <MainContainer>
    <Link
      to={{
        pathname: `/individual:${handle}`,
        state: {
          productHandle: { handle },
          productInfo,
        },
      }}
    >
      <Card
        stretched-link="true"
        className="productCard"
        bg="dirty-blue"
        text="dark-pink"
      >
        <Card.Img variant="top" src={imgSrc}  className="cardImage"/>
        <Card.Body style={{ position: "relative" }}>
          <Card.Title className="cardTitle">
            {name.length >= 50 ? `${name.slice(0, 40)}...` : name}
          </Card.Title>
          <div className="cardPriceDiv">
            <Card.Text className="cardPrice">
              BND {Number.parseFloat(price).toFixed(2)}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </MainContainer>
);

const DetailCard = ({
  productName,
  availability,
  price,
  onChange,
  value,
  name,
  type,
  rating,
  onClick,
}) => {
  return (
    <Card
      className="detailCard"
      style={{ width: "100%", height: "auto", padding: "20px", border: "none" }}
    >
      <Card.Body>
        <Card.Title
          className="cardTitle"
          style={{ color: "#9E1842 ", fontSize: "2.5rem" }}
        >
          {productName}
        </Card.Title>
        <hr />
        <Card.Text className="cardAvailability">
          {availability} Available
        </Card.Text>
        <Card.Text className="cardPrice">
          BND {Number.parseFloat(price).toFixed(2)}
        </Card.Text>
        <Card.Text className="cardQty">QTY</Card.Text>
        <Input
          type={type}
          style={{
            width: "15%",
            textAlign: "center",
            display: "inline-block",
          }}
          min="1"
          max={availability}
          value={value}
          onChange={onChange}
          name={name}
        />
        <Button text="Add to Cart🛒" onClick={onClick} />
      </Card.Body>
    </Card>
  );
};

export { ProductCard, DetailCard };
