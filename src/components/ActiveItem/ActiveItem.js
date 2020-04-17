import React from 'react';
import moment from 'moment';
import styles from './ActiveItem.module.scss';
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg';
import { ReactComponent as ChangeIcon } from '../../assets/change-icon.svg';

const ActiveItem = ({ item, setEditOption }) => {
  const { plan, provider, source } = item;

  const handleOnClick = event => {
    event.preventDefault();
    const { id } = event.currentTarget;

    setEditOption(id);
  };

  const upcaseSource = source
    .split(' ')
    .map(w => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');

  return (
    <div className={styles.container}>
      <div className={styles.header}>Make Changes</div>
      <div className={styles.dataWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.label}>Plan Name</div>
          <div className={styles.value}>{plan.plan_name}</div>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.label}>Provider</div>
          <div className={styles.value}>{provider.provider_name}</div>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.label}>Source</div>
          <div className={styles.value}>{upcaseSource}</div>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.label}>Created On</div>
          <div className={styles.value}>{moment(plan.created_at).format('YYYY MMMM DD')}</div>
        </div>

        <div className={styles.wrapper}>
          <EditIcon className={styles.icon} id={'update'} onClick={handleOnClick} />
          <ChangeIcon className={styles.icon} id={'reassign'} onClick={handleOnClick} />
        </div>
      </div>
    </div>
  );
};

export default ActiveItem;
