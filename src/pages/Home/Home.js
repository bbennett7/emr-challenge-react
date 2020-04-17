import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import API from '../../api/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Home = () => {
  const [loading, setLoadingState] = useState(true);
  const [pendingPlans, setPendingPlans] = useState([]);
  const [masterListPlans, setMasterListPlans] = useState([]);

  useEffect(() => {
    if (loading) {
      getPendingPlans();
      getMasterListPlans();

      setLoadingState(false);
    }
  });

  const getPendingPlans = async () => {
    const data = await API.getPendingPlans();
    setPendingPlans(data.data.pendingPlans);
  };

  const getMasterListPlans = async () => {
    const data = await API.getMasterListPlans();
    setMasterListPlans(data.data.plans);
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  return <div className={styles.container}></div>;
};

export default Home;
