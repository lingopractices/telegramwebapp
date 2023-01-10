import React, { useCallback } from 'react';

import { ReactComponent as LocationPointIcon } from '@assets/icons/location-point.svg';

import styles from './LocationItem.module.scss';

interface ILocationItemProps {
  place: google.maps.places.AutocompletePrediction;
  onSelect: (place: google.maps.places.AutocompletePrediction) => void;
}

const LocationItem: React.FC<ILocationItemProps> = ({ place, onSelect }) => {
  const handleSelect = useCallback(() => {
    onSelect(place);
  }, [place, onSelect]);

  return (
    <li className={styles.container} key={place.place_id} onClick={handleSelect}>
      <LocationPointIcon />
      {place.description}
    </li>
  );
};

export default React.memo(LocationItem);
