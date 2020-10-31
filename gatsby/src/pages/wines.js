import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const WineGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const SingleWineStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: black;
  }
`;

export default function WinesPage({ data }) {
  return (
    <>
      <h2 className="center">
        We have {data.wines.nodes.length} Wines available. Dine in Only!
      </h2>
      <WineGridStyles>
        {data.wines.nodes.map((wine) => {
          const rating = Math.round(wine.rating.average);
          return (
            <SingleWineStyles key={wine.id}>
              <img src={wine.image} alt={wine.name} />
              <h3>{wine.name}</h3>
              {wine.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐️`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)`, display: `block` }}>
                  {`⭐️`.repeat(5 - rating)}
                </span>
                <small className="count">{wine.rating.reviews}</small>
              </p>
            </SingleWineStyles>
          );
        })}
      </WineGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    wines: allWine {
      nodes {
        id
        name: wine
        winery
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`;
