import React, { useCallback } from 'react';

import RadioItem from '@components/RadioItem/RadioItem';
import classNames from 'classnames';
import { ILanguage } from 'lingopractices-models';

import styles from './LanguageItem.module.scss';

interface ILanguageItemProps {
  language: ILanguage;
  selected: boolean;
  containerClass?: string;
  onChangeLanguage: (language: ILanguage) => void;
}

const LanguageItem: React.FC<ILanguageItemProps> = ({
  language,
  selected,
  containerClass,
  onChangeLanguage,
}) => {
  const handleChangeLanguage = useCallback(() => {
    onChangeLanguage(language);
  }, [language, onChangeLanguage]);

  return (
    <div className={classNames(styles.container, containerClass)}>
      <RadioItem
        id={language.id}
        radioGroupName='languages'
        label={language.name}
        onChange={handleChangeLanguage}
        isSelected={selected}
      />
    </div>
  );
};

export default React.memo(LanguageItem);
