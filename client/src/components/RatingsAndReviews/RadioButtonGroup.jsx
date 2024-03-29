import React from 'react';

const potentialValues = {
  Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
  Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
};

// for each characteristic key...
// create its own row
// initial div with characteristic name
// map out for the potential values, each button and relevant name.
const singleButton = (description, index) => (
  <VerticalContainer>
    <LabelForm htmlFor={`"${description}"`}>
      {description}
    </LabelForm>
    <InputNoPadding type="radio" name="format" id={`"${description}"`} value={index} />
  </VerticalContainer>
);

const createCharacteristic = (attribute) => (
  <ClearFieldSet row>
    <div>
      {attribute}
    </div>
    {potentialValues[attribute].map(singleButton)}
  </ClearFieldSet>
);

const mapCharacteristics = (characteristics) => {
  const options = Object.keys(characteristics);

  options.map(createCharacteristic);
};

const RadioButtonGrouped = () => {

};

export default RadioButtonGrouped;
