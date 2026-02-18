import { CACF_VALUES, CACF_CAPABILITIES, STRATEGIC_PILLARS } from '../../utils/idpTemplate';

function getPillarLabel(value) {
  return STRATEGIC_PILLARS.find((p) => p.value === value)?.label || value || '--';
}

export default function ReviewStep({ plan }) {
  const { employeeInfo, lookback, jobDescriptionReview, selfAssessment, valuesAlignment, capabilities, vision, goals } = plan;

  return (
    <div className="step-content review-step step-content-wide">
      <h2>Review Your Plan</h2>
      <p className="step-description">Review all sections before submitting. You can go back to edit any section.</p>

      <section className="review-section">
        <h3>Employee Information</h3>
        <dl>
          <dt>Name</dt><dd>{employeeInfo.employeeName || '--'}</dd>
          <dt>Title</dt><dd>{employeeInfo.jobTitle || '--'}</dd>
          <dt>Department</dt><dd>{employeeInfo.department || '--'}</dd>
          <dt>Manager</dt><dd>{employeeInfo.managerName || '--'}</dd>
          <dt>Period</dt><dd>{employeeInfo.periodCovered || '--'}</dd>
        </dl>
      </section>

      <section className="review-section">
        <h3>Section 1: Lookback</h3>
        <dl>
          <dt>Big Wins</dt><dd className="pre-wrap">{lookback.bigWins || '--'}</dd>
          <dt>What's Working</dt><dd className="pre-wrap">{lookback.whatsWorking || '--'}</dd>
          <dt>What's Not Working</dt><dd className="pre-wrap">{lookback.whatsNotWorking || '--'}</dd>
          <dt>Would Change</dt><dd className="pre-wrap">{lookback.whatWouldYouChange || '--'}</dd>
        </dl>
      </section>

      <section className="review-section">
        <h3>Section 2: Job Description Review</h3>
        <dl>
          <dt>Duties Not Captured</dt><dd className="pre-wrap">{jobDescriptionReview.dutiesNotCaptured || '--'}</dd>
          <dt>Shifted Responsibilities</dt><dd className="pre-wrap">{jobDescriptionReview.responsibilitiesShifted || '--'}</dd>
          <dt>Role Growth</dt><dd className="pre-wrap">{jobDescriptionReview.roleGrownBeyondScope || '--'}</dd>
        </dl>
      </section>

      <section className="review-section">
        <h3>Section 3: Self-Assessment</h3>
        {[
          { title: 'Knowledge', s: selfAssessment.knowledgeStrengths, g: selfAssessment.knowledgeGaps },
          { title: 'Delivery/Execution', s: selfAssessment.deliveryStrengths, g: selfAssessment.deliveryGaps },
          { title: 'Communication & Leadership', s: selfAssessment.communicationStrengths, g: selfAssessment.communicationGaps },
        ].map(({ title, s, g }) => (
          <div key={title} className="review-sub-section">
            <h4>{title}</h4>
            <dl>
              <dt>Strengths</dt><dd className="pre-wrap">{s || '--'}</dd>
              <dt>Growth Areas</dt><dd className="pre-wrap">{g || '--'}</dd>
            </dl>
          </div>
        ))}
      </section>

      <section className="review-section">
        <h3>Section 4: Values Alignment</h3>
        {CACF_VALUES.map((val) => {
          const d = valuesAlignment[val.key];
          if (!d.reflection && !d.evidence && !d.nextSteps) return null;
          return (
            <div key={val.key} className="review-sub-section">
              <h4>{val.name}</h4>
              <dl>
                <dt>Reflection</dt><dd className="pre-wrap">{d.reflection || '--'}</dd>
                <dt>Evidence</dt><dd className="pre-wrap">{d.evidence || '--'}</dd>
                <dt>Next Steps</dt><dd className="pre-wrap">{d.nextSteps || '--'}</dd>
              </dl>
            </div>
          );
        })}
      </section>

      <section className="review-section">
        <h3>Section 4: Capabilities</h3>
        {CACF_CAPABILITIES.map((cap) => {
          const d = capabilities[cap.key];
          if (!d.reflection && !d.nextYear && !d.supportNeeded) return null;
          return (
            <div key={cap.key} className="review-sub-section">
              <h4>{cap.name}</h4>
              <dl>
                <dt>Reflection</dt><dd className="pre-wrap">{d.reflection || '--'}</dd>
                <dt>Next Year</dt><dd className="pre-wrap">{d.nextYear || '--'}</dd>
                <dt>Support Needed</dt><dd className="pre-wrap">{d.supportNeeded || '--'}</dd>
              </dl>
            </div>
          );
        })}
      </section>

      <section className="review-section">
        <h3>Section 5: Vision & Goals</h3>
        <dl>
          <dt>1-Year Vision</dt><dd className="pre-wrap">{vision.oneYear || '--'}</dd>
          <dt>3-Year Vision</dt><dd className="pre-wrap">{vision.threeYear || '--'}</dd>
        </dl>
        {goals.filter((g) => g.goal).map((goal, i) => (
          <div key={goal.id} className="review-sub-section">
            <h4>Goal {i + 1}: {goal.goal}</h4>
            <dl>
              <dt>Strategic Alignment</dt><dd>{getPillarLabel(goal.strategicAlignment)}</dd>
              <dt>Milestones</dt><dd className="pre-wrap">{goal.milestones || '--'}</dd>
              <dt>Resources</dt><dd className="pre-wrap">{goal.resourcesNeeded || '--'}</dd>
              <dt>Development Activity</dt><dd className="pre-wrap">{goal.developmentActivity || '--'}</dd>
              <dt>Timeline</dt><dd>{goal.timeline || '--'}</dd>
              <dt>Follow-up</dt><dd>{goal.followUpMethod || '--'}</dd>
            </dl>
          </div>
        ))}
      </section>
    </div>
  );
}
