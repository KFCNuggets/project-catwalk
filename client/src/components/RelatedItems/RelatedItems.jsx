import React, { useState } from 'react';
import styled from 'styled-components';
// import styled, { css } from 'styled-components';
import CardList from './CardList';
import OutfitList from './OutfitList';

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

const RelatedItems = ({ productId, related, product, passBackProductId }) => {
  const [pID, setPID] = useState(productId);

  // Child is now holding state
  const setProdId = (prodId) => {
    setPID(prodId);
  };

  // TODO: use passBackProductId to handle state in app.jsx
  // Currently throws an error
  // passBackProductId(pID);

  return (
    <Wrapper>
      <CardList
        productId={productId}
        related={related}
        product={product}
        passBackId={setProdId}
      />
      {/* <OutfitList /> */}
    </Wrapper>
  );
};

// class RelatedItems extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       productId
//       reviews: null
//     };
//     this.setProdId = this.setProdId.bind(this.setProdId);
//   }

//   componentDidMount() {
//     this.setState({ productId: productId });
//   }
//   setProdId(prodId) {
//     this.setState({ prodId });
//   }

//   render() {
//     const { related, product, productId} = this.props;
//     return (
//       <Wrapper>
//         <CardList
//           productId={productId}
//           related={related}
//           product={product}
//           passBackId={this.setProdId}
//         />
//         {/* <OutfitList /> */}
//       </Wrapper>
//     );
//   }
// }

export default RelatedItems;
