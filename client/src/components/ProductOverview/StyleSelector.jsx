import React, { useState } from 'react';
import styled from 'styled-components';

// //////////////// ASSIGNED GRID AREA //////////////// //
const StyleSelectorArea = styled.div`
  grid-area: StyleSelector;
`;

// //////////////// STYLED COMPONENTS //////////////// //
const StyleName = styled.div`
  font-size: 15px;
`;

const ThumbnailWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const Thumbnail = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid;
  border-color: ${(props) => (props.selected ? '#FF5A5F' : '#ddd')};
  border-radius: 50%;
  padding: 3px;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    border-color: #FF5A5F;
  }
`;

// //////////////// HELPER FUNCTIONS //////////////// //
// input: styles <- an object with results array containing style objects
// output: an array of first thumbnail urls from each style object
const getThumbnailUrls = (styles) => {
  const { results } = styles;
  return results.map((style) => style.photos[0].thumbnail_url);
};

// //////////////// MAIN COMPONENT //////////////// //
const StyleSelector = (props) => {
  const { styles, style, setStyle } = props;
  const { name } = style;
  const thumbnailUrls = getThumbnailUrls(styles);
  const [styleIndex, setStyleIndex] = useState(0);
  const handleClick = (index) => {
    setStyleIndex(index);
    setStyle(styles.results[index]);
  };

  return (
    <StyleSelectorArea>
      <StyleName>
        {`Selected Style > ${name}`}
      </StyleName>
      <ThumbnailWrapper>
        {thumbnailUrls.map((thumbnailUrl, index) => (index === styleIndex ? (
          <Thumbnail key={index} selected src={thumbnailUrl} loading="lazy" onClick={() => handleClick(index)} />
        ) : (
          <Thumbnail key={index} src={thumbnailUrl} loading="lazy" onClick={() => handleClick(index)} />
        )))}
      </ThumbnailWrapper>
    </StyleSelectorArea>
  );
};

export default StyleSelector;
