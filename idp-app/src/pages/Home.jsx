import { useNavigate } from 'react-router-dom';
import { useIdp } from '../context/IdpContext';

export default function Home() {
  const navigate = useNavigate();
  const { plans } = useIdp();

  const submitted = plans.filter((p) => p.status === 'submitted' || p.status === 'approved');
  const drafts = plans.filter((p) => p.status === 'draft');

  return (
    <div className="page home-page">
      <div className="hero">
        <h1>2026 Individual Development Plan</h1>
        <p className="hero-subtitle">Charlottesville Area Community Foundation</p>
        <p>
          A collaborative process to support your growth while advancing CACF's mission.
          Reflect on the past year, align your vision with our values and competencies, set measurable goals,
          and turn those goals into an actionable plan with clear accountability.
        </p>
      </div>

      <div className="role-cards">
        <div className="role-card" onClick={() => navigate('/employee')}>
          <div className="role-icon">Employee</div>
          <h2>I'm an Employee</h2>
          <p>Complete your IDP workbook: reflect on the past year, assess your performance, align with CACF values, and set development goals.</p>
          <button className="btn btn-primary">Start My IDP</button>
        </div>
        <div className="role-card" onClick={() => navigate('/manager')}>
          <div className="role-icon">Manager</div>
          <h2>I'm a Manager</h2>
          <p>Review employee plans, complete your parallel assessment across Knowledge, Delivery, and Communication & Leadership, then approve or request revisions.</p>
          <button className="btn btn-primary">Review Plans</button>
        </div>
      </div>

      {plans.length > 0 && (
        <div className="saved-plans-section">
          <h2>Saved Plans</h2>
          <div className="plans-list">
            {drafts.length > 0 && (
              <div className="plans-group">
                <h3>Drafts</h3>
                {drafts.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} navigate={navigate} />
                ))}
              </div>
            )}
            {submitted.length > 0 && (
              <div className="plans-group">
                <h3>Submitted / Approved</h3>
                {submitted.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} navigate={navigate} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PlanCard({ plan, navigate }) {
  const { removePlan } = useIdp();
  const name = plan.employeeInfo.employeeName || 'Unnamed Plan';
  const date = new Date(plan.updatedAt).toLocaleDateString();

  return (
    <div className="plan-card">
      <div className="plan-card-info">
        <strong>{name}</strong>
        <span className="plan-meta">
          {plan.employeeInfo.jobTitle && `${plan.employeeInfo.jobTitle} · `}
          {plan.employeeInfo.department && `${plan.employeeInfo.department} · `}
          {plan.status} · Updated {date}
        </span>
      </div>
      <div className="plan-card-actions">
        <button className="btn btn-sm btn-secondary" onClick={(e) => { e.stopPropagation(); navigate(`/employee/${plan.id}`); }}>
          Edit
        </button>
        <button className="btn btn-sm btn-secondary" onClick={(e) => { e.stopPropagation(); navigate(`/manager/${plan.id}`); }}>
          Review
        </button>
        <button className="btn btn-sm btn-danger" onClick={(e) => { e.stopPropagation(); if (confirm('Delete this plan?')) removePlan(plan.id); }}>
          Delete
        </button>
      </div>
    </div>
  );
}
