// import Title from "../../components/layout/title";
import { ProductCard } from "../../components/card";
import CardDeck from "react-bootstrap/CardDeck";
import { gql, useQuery } from "@apollo/client";
import Loading from "../Loading";
import Error from "../Error";
import { Row } from "react-bootstrap/";

// import Client from "shopify-buy";
import styled from "styled-components";

const Container = styled.div`
  border: 5px solid #ff286b;
  border-radius: 3px;
  border-bottom: 50px solid #ff286b;
  padding: 20px 20px 60px 20px;
  height: auto;
  width: 80%;
  transform: translateX(15%);
  margin-top: 100px;

  .card-deck {
    margin-right: 15px;
  }

  .card {
    margin-top: 35px;
  }

  h2 {
    background: #005678;
    height: 10vh;
    width: auto;
    margin: -100px 0 0 0;
  }

  @media (max-width: 500px) {
    width: 95vw;
    margin: 80px 0 0 0;

    h2 {
      font-size: 4em;
      text-align: center;
      margin: -70px 0 0 0;
    }
  }
`;

const MainContainer = styled.div`
  @media (max-width: 500px) {
    margin: 180px 0 0 -45px;
  }
`;

const query = gql`
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          productType
          tags
          description
          totalInventory
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                id
                originalSrc
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
    productTypes(first: 10) {
      edges {
        node
      }
    }
  }
`;

const Home = () => {
  const { loading, data, error } = useQuery(query);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <MainContainer>
      {/* {console.log("NEW DATA", data)} */}
      {data.productTypes.edges.map(({ node: catNode}, index) => (
        <Container key={index}>
          <h2  data-title={catNode}>{catNode}</h2>
          <CardDeck >
            <Row xs={2} sm={3} md={4}>
              {data.products.edges.map(({ node }, index) =>
                node.productType === catNode ? (
                  <ProductCard
                    key={index}
                    className="card"
                    imgSrc={node.images.edges[0].node.originalSrc}
                    name={node.title}
                    price={node.priceRange.maxVariantPrice.amount}
                    handle={node.handle}
                    productInfo={node}
                  />
                ) : null
              )}
            </Row>
          </CardDeck>
        </Container>
      ))}
    </MainContainer>
  );
};

export default Home;
