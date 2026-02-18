const STORAGE_KEY = 'idp_plans';

export function loadPlans() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePlans(plans) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function savePlan(plan) {
  const plans = loadPlans();
  const idx = plans.findIndex((p) => p.id === plan.id);
  if (idx >= 0) {
    plans[idx] = plan;
  } else {
    plans.push(plan);
  }
  savePlans(plans);
  return plans;
}

export function deletePlan(id) {
  const plans = loadPlans().filter((p) => p.id !== id);
  savePlans(plans);
  return plans;
}

export function getPlan(id) {
  return loadPlans().find((p) => p.id === id) || null;
}
