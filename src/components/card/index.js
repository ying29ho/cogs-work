import Card from "react-bootstrap/Card";
import Button from "../button";
import { Input } from "../form";
// import Form from "../../components/form";
import { Col } from "react-bootstrap/";
import { Link } from "react-router-dom";
// import { useFormik } from "formik";
import styled from "styled-components";
import "./card.scss";

const MainContainer = styled.div`
  .Container {
    padding: 0px;
  }
  .card {
    min-width: 230px;
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

const ProductCard = ({
  imgSrc,
  name,
  price,
  rating,
  handle,
  productInfo,
  ...props
}) => (
  <MainContainer>
    {/* <Container> */}
    <Col xs={6} sm={3}>
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
          // style={{ width: "250px", cursor: "pointer", height: "400px" }}
        >
          <Card.Img variant="top" src={imgSrc} />
          <Card.Body>
            <Card.Title className="cardTitle">{name}</Card.Title>
            {/* <Card.Text className="cardPrice">⭐️⭐️⭐️⭐️⭐️</Card.Text> */}
            <Card.Text className="cardPrice">
              BND {Number.parseFloat(price).toFixed(2)}{" "}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
    {/* </Row> */}
    {/* </Container> */}
  </MainContainer>
);

const DetailCard = ({
  productName,
  availability,
  price,
  onChange,
  value, 
  name,type,
  // quantity,
  rating,
  onClick,
}) => {
  // const formik = useFormik({
  //   initialValues: {
  //     quantity: 1,
  //   },
  //   onSubmit: (values) => {
  //     alert("wah");
  //   },
  // });
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
          BND {Number.parseFloat(price).toFixed(2)}{" "}
        </Card.Text>

        <Card.Text className="cardQty">
          QTY
        </Card.Text>
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
        {/* <Card.Text className="cardPrice">⭐️⭐️⭐️⭐️⭐️</Card.Text> */}
        <Button text="Add to Cart🛒" onClick={onClick} />
      </Card.Body>
    </Card>
  );
};

export { ProductCard, DetailCard };
