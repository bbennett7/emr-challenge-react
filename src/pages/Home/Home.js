import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import API from '../../api/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import PendingList from '../../components/PendingList/PendingList';
import ActiveItem from '../../components/ActiveItem/ActiveItem';

const Home = () => {
  const [loading, setLoadingState] = useState(true);
  const [pendingPlans, setPendingPlans] = useState([]);
  const [masterListPlans, setMasterListPlans] = useState([]);
  const [activePlan, setActivePlan] = useState({});

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  });

  const fetchData = async () => {
    const pendingPlanData = await API.getPendingPlans();
    const { pendingPlans } = pendingPlanData.data;
    setPendingPlans(pendingPlans);
    setActivePlan(pendingPlans[0]);

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
      <div className={styles.wrapper}>
        <PendingList
          items={pendingPlans}
          setActiveItem={setActivePlan}
          itemsType={'plan'}
          activeId={activePlan.plan.id}
        />
        <ActiveItem item={activePlan} />
      </div>
    </div>
  );
};

export default Home;
