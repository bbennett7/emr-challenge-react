import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import API from '../../api/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PendingList from '../../components/PendingList/PendingList';

const Home = () => {
  const [loading, setLoadingState] = useState(true);
  const [pendingPlans, setPendingPlans] = useState([]);
  const [masterListPlans, setMasterListPlans] = useState([]);
  const [activePlanId, setActivePlanId] = useState({});

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  });

  const fetchData = async () => {
    const pendingPlanData = await API.getPendingPlans();
    const { pendingPlans } = pendingPlanData.data;
    setPendingPlans(pendingPlans);
    setActivePlanId(pendingPlans[0].plan.id);

    const masterPlanData = await API.getMasterListPlans();
    setMasterListPlans(masterPlanData.data.plans);

    setLoadingState(false);
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
      <PendingList items={pendingPlans} setActiveItem={setActivePlanId} />
    </div>
  );
};

export default Home;
