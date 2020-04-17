import React from 'react';
import styles from './UpdateItem.module.scss';

const UpdateItem = ({ activePlan }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Update Item</div>
      <div className={styles.description}>
        Making changes to this plan will update the plan in the system&apos;s master list. The
        source&apos;s mapping entry will not be changed.
      </div>
    </div>
  );
};

export default UpdateItem;
