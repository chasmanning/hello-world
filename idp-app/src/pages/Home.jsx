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
        <h1>Individualized Development Program</h1>
        <p>Build a personalized growth plan to advance your career. Whether you're an employee creating your plan or a manager reviewing one, start here.</p>
      </div>

      <div className="role-cards">
        <div className="role-card" onClick={() => navigate('/employee')}>
          <div className="role-icon">👤</div>
          <h2>I'm an Employee</h2>
          <p>Create or update your individual development plan. Identify your goals, strengths, development areas, and build an action plan.</p>
          <button className="btn btn-primary">Start My Plan</button>
        </div>
        <div className="role-card" onClick={() => navigate('/manager')}>
          <div className="role-icon">👥</div>
          <h2>I'm a Manager</h2>
          <p>Review your team members' development plans, provide feedback, and help them grow in their careers.</p>
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
                <h3>Submitted / Reviewed</h3>
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
