import React from 'react';
import styles from './PendingList.module.scss';

const PendingList = ({ items, setActiveItem }) => {
  const handleOnClick = event => {
    event.preventDefault();
    const { id } = event.currentTarget;
    console.log('clicked', id);
    return setActiveItem(id);
  };

  const renderPendingList = () => {
    return items.map(item => {
      const { provider, plan } = item;
      return (
        <div className={styles.item} key={plan.id} id={plan.id} onClick={handleOnClick}>
          {provider.provider_name} - {plan.plan_name}
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Pending Items</div>
      {renderPendingList()}
    </div>
  );
};

export default PendingList;
