import React from 'react';
import styles from './PendingList.module.scss';

const PendingList = ({ items, setActiveItem, itemsType, activeId }) => {
  const handleOnClick = event => {
    event.preventDefault();
    const { id } = event.currentTarget;
    const item = items.find(i => i[itemsType].id == id);

    return setActiveItem(item);
  };

  const renderPendingList = () => {
    return items.map(item => {
      const { provider, plan } = item;
      const className = activeId === item[itemsType].id ? styles.active : null;

      return (
        <div
          className={`${styles.item} ${className}`}
          key={plan.id}
          id={plan.id}
          onClick={handleOnClick}
        >
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
