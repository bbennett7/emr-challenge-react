import React from 'react';
import styles from './UpdateItem.module.scss';
import Button from '../Button/Button';

const UpdateItem = ({ activePlan }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Update Item</div>
      <div className={styles.description}>
        Making changes to this plan will update the plan in the system&apos;s master list. The
        source&apos;s mapping entry will not be changed.
      </div>

      <form className={styles.form}>
        <label>
          Plan Name
          <input type="text" />
        </label>

        <label>
          Plan Type
          <input type="text" />
        </label>

        <Button type="submit" />
      </form>
    </div>
  );
};

export default UpdateItem;
