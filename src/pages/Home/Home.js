import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import API from '../../api/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PendingList from '../../components/PendingList/PendingList';
import ActiveItem from '../../components/ActiveItem/ActiveItem';
import UpdateItem from '../../components/UpdateItem/UpdateItem';
import ReassignItem from '../../components/ReassignItem/ReassignItem';

const Home = () => {
  const [loading, setLoadingState] = useState(true);
  const [pendingPlans, setPendingPlans] = useState([]);
  const [masterListPlans, setMasterListPlans] = useState([]);
  const [activePlan, setActivePlan] = useState({});
  const [editOption, setEditOption] = useState('update');

  const fetchData = async () => {
    const pendingPlanData = await API.getPendingPlans();
    const { data } = pendingPlanData;
    setPendingPlans(data.pendingPlans);
    setActivePlan(data.pendingPlans[0]);

    const masterPlanData = await API.getMasterListPlans();
    setMasterListPlans(masterPlanData.data.plans);

    setLoadingState(false);
  };

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading]);

  const removeApprovedItem = id => {
    const updatedPendingPlans = pendingPlans;
    const i = updatedPendingPlans.findIndex(plan => plan.plan.id === id);
    updatedPendingPlans.splice(i, 1);

    setPendingPlans(updatedPendingPlans);
    setActivePlan(updatedPendingPlans[0]);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (pendingPlans.length === 0) {
    return <div className={styles.container}>No pending plans to approve.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <PendingList
          items={pendingPlans}
          setActiveItem={setActivePlan}
          itemsType={'plan'}
          activeId={activePlan.plan.id}
        />
        <ActiveItem item={activePlan} setEditOption={setEditOption} />
        {editOption === 'update' ? (
          <UpdateItem activeItem={activePlan} removeApprovedItem={removeApprovedItem} />
        ) : (
          <ReassignItem
            activeItem={activePlan}
            masterListItems={masterListPlans}
            removeApprovedItem={removeApprovedItem}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
