import React from 'react';

import { ReactComponent as SearchIcon } from '@assets/icons/search.svg';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './SearchBox.module.scss';

interface ISearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  containerClassname?: string;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ value, containerClassname, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.container, { [`${containerClassname}`]: true })}>
      <SearchIcon />
      <input
        className={styles.input}
        value={value}
        type='text'
        onChange={onChange}
        placeholder={t('search')}
      />
    </div>
  );
};

export default React.memo(SearchBox);
