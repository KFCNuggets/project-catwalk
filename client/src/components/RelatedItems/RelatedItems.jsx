import React from 'react';
import styled from 'styled-components';
// import styled, { css } from 'styled-components';
import CardList from './CardList';

// TO DO:
// App passed down related item
// Need to perform a get request in here to get the styles of each related item
// Then extract the url sources from each of the syles of each related item
// Store those urls into an array, then send it to the cardlist child

const Wrapper = styled.div`
  margin: auto;
  padding: 2rem;
  min-width: 80vw;
`;

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
    };
  }

  render() {
    const { related, product } = this.props;
    return (
      <Wrapper>
        <CardList related={related} product={product} />
        {/* <OutfitList /> */}
      </Wrapper>
    );
  }
}

export default RelatedItems;
