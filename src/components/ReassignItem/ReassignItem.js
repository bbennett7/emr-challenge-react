import React, { useState } from 'react';
import styles from './ReassignItem.module.scss';
import Button from '../Button/Button';
import API from '../../api/index';

const ReassignItem = ({ masterListItems, activeItem, removeApprovedItem }) => {
  const [selectedMasterItem, setSelectedMasterItem] = useState(masterListItems[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnClick = event => {
    const { id } = event.currentTarget;
    const selectedItem = masterListItems.find(item => item.plan.id == id);

    setSelectedMasterItem(selectedItem);
  };

  const handleOnSubmit = async event => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const body = {
        selected_plan_id: activeItem.plan.id,
        plan_id: selectedMasterItem.plan.id,
        provider_id: selectedMasterItem.provider.id
      };

      await API.updatePlanMapper(body);
      await API.deleteMasterListPlan(activeItem.plan.id);
      removeApprovedItem(activeItem.plan.id);
    } catch (err) {
      return setErrorMessage(err.message);
    }
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
      <div onClick={handleOnSubmit}>
        <Button />
      </div>
      {!errorMessage ? null : <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};

export default ReassignItem;
