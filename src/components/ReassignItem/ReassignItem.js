import React, { useState } from 'react';
import styles from './ReassignItem.module.scss';

const ReassignItem = ({ masterListItems }) => {
  const [selectedMasterItem, setSelectedMasterItem] = useState(masterListItems[0]);

  const handleOnClick = event => {
    const { id } = event.currentTarget;
    const selectedItem = masterListItems.find(item => item.plan.id == id);

    setSelectedMasterItem(selectedItem);
  };

  const renderMasterListItems = () => {
    return masterListItems.map(item => {
      const { provider, plan } = item;
      const className = plan.id === selectedMasterItem.plan.id ? styles.activeItem : styles.item;
      return (
        <div className={className} key={plan.id} id={plan.id} onClick={handleOnClick}>
          <div className={styles.providerName}>{provider.provider_name}</div>

          <div className={styles.planName}>{plan.plan_name}</div>

          <div className={styles.planType}>
            {plan.plan_type ? plan.plan_type : 'No type listed'}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Reassign Item</div>
      <div className={styles.description}>
        Select an item from the list below to map the source&apos;s data to an existing item from
        the master list.
      </div>
      <div className={styles.scrollContainer}>{renderMasterListItems()}</div>
    </div>
  );
};

export default ReassignItem;
