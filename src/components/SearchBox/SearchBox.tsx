import React from 'react';

import { ReactComponent as SearchIcon } from '@assets/icons/search.svg';
import classNames from 'classnames';

import styles from './SearchBox.module.scss';


interface ISearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  containerClassname?: string;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ value, containerClassname, onChange }) => (
  <div className={classNames(styles.container, { [`${containerClassname}`]: true })}>
    <SearchIcon />
    <input className={styles.input} value={value} type='text' onChange={onChange} placeholder='Search' />
  </div>
);

export default React.memo(SearchBox);
