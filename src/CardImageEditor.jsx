import React from 'react';
import image from './images/visitingcard.jpg'

const CardImageEditor = () => {
  return (
    <div>
      <img src={image} alt="Visiting Card" />
      {/* Additional code for clearing and adding fields */}
    </div>
  );
};

export default CardImageEditor;