import { createContext, useContext, useState, useCallback } from 'react';
import { loadPlans, savePlan as storageSavePlan, deletePlan as storageDeletePlan } from '../utils/storage';

const IdpContext = createContext(null);

export function IdpProvider({ children }) {
  const [plans, setPlans] = useState(() => loadPlans());
  const [currentPlan, setCurrentPlan] = useState(null);

  const savePlan = useCallback((plan) => {
    const updated = { ...plan, updatedAt: new Date().toISOString() };
    const newPlans = storageSavePlan(updated);
    setPlans(newPlans);
    setCurrentPlan(updated);
    return updated;
  }, []);

  const removePlan = useCallback((id) => {
    const newPlans = storageDeletePlan(id);
    setPlans(newPlans);
    if (currentPlan?.id === id) setCurrentPlan(null);
  }, [currentPlan]);

  const refreshPlans = useCallback(() => {
    setPlans(loadPlans());
  }, []);

  return (
    <IdpContext.Provider value={{ plans, currentPlan, setCurrentPlan, savePlan, removePlan, refreshPlans }}>
      {children}
    </IdpContext.Provider>
  );
}

export function useIdp() {
  const ctx = useContext(IdpContext);
  if (!ctx) throw new Error('useIdp must be used within IdpProvider');
  return ctx;
}
