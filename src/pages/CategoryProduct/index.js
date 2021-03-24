import React from "react";
import { ProductCard } from "../../components/card";
import Loading from "../Loading";
import Error from "../Error";
import CardDeck from "react-bootstrap/CardDeck";
import { gql, useQuery } from "@apollo/client";

import { Row, Col } from "react-bootstrap/";

import styled from "styled-components";

const MainContainer = styled.div`
  @media (max-width: 770px) {
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
  }
`;

const CategoryProduct = ({ category }) => {
  const { loading, data, error } = useQuery(query);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <MainContainer>
      <div className="border-container">
        <h2 data-title={category}>{category}</h2>
        <CardDeck>
          <Row xs={2} sm={2} md={3} lg={4}>
            {data.products.edges.map(({ node }) =>
              node.productType === category ? (
                <Col>
                  <ProductCard
                    key={node.id}
                    imgSrc={node.images.edges[0].node.originalSrc}
                    name={node.title}
                    price={node.priceRange.maxVariantPrice.amount}
                    handle={node.handle}
                    productInfo={node}
                  />
                </Col>
              ) : null
            )}
          </Row>
        </CardDeck>
      </div>
    </MainContainer>
  );
};

export default CategoryProduct;
