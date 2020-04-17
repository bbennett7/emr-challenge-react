import React from 'react';
import moment from 'moment';
import styles from './ActiveItem.module.scss';

const ActiveItem = ({ item }) => {
  const { plan, provider, source } = item;

  const upcaseSource = source
    .split(' ')
    .map(w => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');

  return (
    <div className={styles.container}>
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
      </div>
    </div>
  );
};

export default ActiveItem;
