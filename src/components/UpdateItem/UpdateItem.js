import React, { useState, useEffect } from 'react';
import styles from './UpdateItem.module.scss';
import Button from '../Button/Button';
import API from '../../api/index';

const UpdateItem = ({ activeItem, removeApprovedItem }) => {
  const { plan } = activeItem;
  const [loading, setLoadingStatus] = useState(true);
  const [nameInput, setNameInput] = useState(plan.plan_name);
  const [typeInput, setTypeInput] = useState(plan.plan_type);
  const [originalName, setOriginalName] = useState(plan.plan_name);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!loading && originalName !== plan.plan_name) {
      setOriginalName(plan.plan_name);
    }

    if (originalName !== plan.plan_name) {
      setNameInput(plan.plan_name);
      !plan.plan_type ? setTypeInput('') : setTypeInput(plan.plan_type);
    }

    if (loading) {
      setLoadingStatus(false);
    }
  }, [loading, originalName, plan.plan_name, plan.plan_type]);

  const handleOnChange = event => {
    event.preventDefault();
    const { id, value } = event.currentTarget;

    if (id === 'name') {
      setNameInput(value);
    }

    if (id === 'type') {
      setTypeInput(value);
    }
  };

  const handleOnSubmit = async event => {
    event.preventDefault();
    const body = {
      plan_name: nameInput,
      plan_type: typeInput
    };

    try {
      const d = await API.updateMasterListPlan(body, plan.id);
      console.log(d);
      removeApprovedItem(plan.id);
    } catch (err) {
      return setErrorMessage(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Update Item</div>
      <div className={styles.description}>
        Making changes to this plan will update the plan in the system&apos;s master list. The
        source&apos;s mapping entry will not be changed. Approving without making changes approves
        the entry as is.
      </div>

      <form className={styles.form} onSubmit={handleOnSubmit}>
        <label>
          Plan Name
          <input
            type="text"
            id={'name'}
            value={nameInput}
            defaultValue={nameInput}
            onChange={handleOnChange}
          />
        </label>

        <label>
          Plan Type
          <input
            type="text"
            id={'type'}
            value={typeInput}
            defaultValue={typeInput}
            onChange={handleOnChange}
          />
        </label>

        <Button type="submit" onClick={handleOnSubmit} />

        {errorMessage === '' ? null : <div className={styles.error}>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default UpdateItem;
