import { ACTION_CATEGORIES, ACTION_STATUSES } from '../../utils/idpTemplate';

function getLabel(options, value) {
  return options.find((o) => o.value === value)?.label || value || '—';
}

export default function ReviewStep({ plan }) {
  const { employeeInfo, currentRole, careerGoals, strengths, developmentAreas, actionItems, supportNeeded } = plan;

  return (
    <div className="step-content review-step">
      <h2>Review Your Plan</h2>
      <p className="step-description">Review all sections before submitting. You can go back to edit any section.</p>

      <section className="review-section">
        <h3>Employee Information</h3>
        <dl>
          <dt>Name</dt><dd>{employeeInfo.employeeName || '—'}</dd>
          <dt>Title</dt><dd>{employeeInfo.jobTitle || '—'}</dd>
          <dt>Department</dt><dd>{employeeInfo.department || '—'}</dd>
          <dt>Manager</dt><dd>{employeeInfo.managerName || '—'}</dd>
          <dt>Plan Period</dt><dd>{employeeInfo.planPeriod || '—'}</dd>
        </dl>
      </section>

      <section className="review-section">
        <h3>Current Role</h3>
        <dl>
          <dt>Responsibilities</dt><dd>{currentRole.responsibilities || '—'}</dd>
          <dt>Recent Accomplishments</dt><dd>{currentRole.recentAccomplishments || '—'}</dd>
          <dt>Performance Rating</dt><dd>{currentRole.performanceRating || '—'}</dd>
        </dl>
      </section>

      <section className="review-section">
        <h3>Career Goals</h3>
        <dl>
          <dt>Short-Term Goal</dt><dd>{careerGoals.shortTermGoal || '—'}</dd>
          <dt>Short-Term Timeline</dt><dd>{careerGoals.shortTermTimeline || '—'}</dd>
          <dt>Long-Term Goal</dt><dd>{careerGoals.longTermGoal || '—'}</dd>
          <dt>Long-Term Timeline</dt><dd>{careerGoals.longTermTimeline || '—'}</dd>
          <dt>Ideal Next Role</dt><dd>{careerGoals.idealNextRole || '—'}</dd>
        </dl>
      </section>

      <section className="review-section">
        <h3>Strengths</h3>
        <ul>
          {strengths.topStrengths.filter(Boolean).map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        {strengths.howToLeverage && <p><strong>How to Leverage:</strong> {strengths.howToLeverage}</p>}
      </section>

      <section className="review-section">
        <h3>Development Areas</h3>
        <ul>
          {developmentAreas.areasForGrowth.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
        </ul>
        {developmentAreas.skillGaps && <p><strong>Skill Gaps:</strong> {developmentAreas.skillGaps}</p>}
      </section>

      <section className="review-section">
        <h3>Action Plan</h3>
        {actionItems.filter((item) => item.activity).map((item, i) => (
          <div key={item.id} className="review-action-item">
            <h4>Activity {i + 1}: {item.activity}</h4>
            <dl>
              <dt>Category</dt><dd>{getLabel(ACTION_CATEGORIES, item.category)}</dd>
              <dt>Target Date</dt><dd>{item.targetDate || '—'}</dd>
              <dt>Resources</dt><dd>{item.resources || '—'}</dd>
              <dt>Success Measure</dt><dd>{item.successMeasure || '—'}</dd>
              <dt>Status</dt><dd>{getLabel(ACTION_STATUSES, item.status)}</dd>
            </dl>
          </div>
        ))}
      </section>

      <section className="review-section">
        <h3>Support Needed</h3>
        <dl>
          <dt>From Manager</dt><dd>{supportNeeded.fromManager || '—'}</dd>
          <dt>From Organization</dt><dd>{supportNeeded.fromOrganization || '—'}</dd>
          <dt>Budget</dt><dd>{supportNeeded.budget || '—'}</dd>
          <dt>Time Commitment</dt><dd>{supportNeeded.timeCommitment || '—'}</dd>
        </dl>
      </section>
    </div>
  );
}
