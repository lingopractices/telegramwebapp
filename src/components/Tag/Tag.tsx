import React from 'react';

import classNames from 'classnames';

import styles from './Tag.module.scss';

interface ITagProps {
  title: string;
  containerClass?: string;
}

const Tag: React.FC<ITagProps> = ({ title, containerClass }) => (
  <div className={classNames(styles.container, containerClass)}>{title}</div>
);

export default React.memo(Tag);
