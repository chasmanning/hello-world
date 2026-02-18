import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdp } from '../context/IdpContext';
import { getPlan } from '../utils/storage';
import { MANAGER_STEPS } from '../utils/idpTemplate';
import { TextField } from '../components/FormField';
import StepIndicator from '../components/StepIndicator';
import WizardNav from '../components/WizardNav';
import ReviewStep from '../components/steps/ReviewStep';

export default function ManagerReview() {
  const navigate = useNavigate();
  const { planId } = useParams();
  const { plans, savePlan } = useIdp();
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(planId || '');

  useEffect(() => {
    if (planId) {
      const existing = getPlan(planId);
      if (existing) {
        setPlan(existing);
        setStep(1);
      }
    }
  }, [planId]);

  const handleSelectPlan = () => {
    if (!selectedPlanId) return;
    const existing = getPlan(selectedPlanId);
    if (existing) {
      setPlan(existing);
      setStep(1);
    }
  };

  const updateAssessment = (field, value) => {
    setPlan((prev) => ({
      ...prev,
      managerAssessment: { ...prev.managerAssessment, [field]: value },
    }));
  };

  const handleApprove = () => {
    const reviewed = { ...plan, status: 'approved' };
    savePlan(reviewed);
    navigate('/', { state: { message: 'Plan approved!' } });
  };

  const handleRequestRevision = () => {
    const reviewed = { ...plan, status: 'draft' };
    savePlan(reviewed);
    navigate('/', { state: { message: 'Revision requested. Plan sent back to employee.' } });
  };

  const handleNext = () => {
    if (step < MANAGER_STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  };

  const reviewablePlans = plans.filter((p) => p.status === 'submitted' || p.status === 'approved' || p.status === 'draft');

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="step-content">
            <h2>Select a Plan to Review</h2>
            <p className="step-description">Choose an employee's development plan to review and provide your parallel assessment.</p>
            {reviewablePlans.length === 0 ? (
              <div className="empty-state">
                <p>No plans available for review. Employees need to create and submit their plans first.</p>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Go Home</button>
              </div>
            ) : (
              <div className="plan-select-list">
                {reviewablePlans.map((p) => (
                  <div
                    key={p.id}
                    className={`plan-select-item ${selectedPlanId === p.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPlanId(p.id)}
                  >
                    <div>
                      <strong>{p.employeeInfo.employeeName || 'Unnamed'}</strong>
                      <span className="plan-meta">
                        {p.employeeInfo.jobTitle && `${p.employeeInfo.jobTitle} · `}
                        Status: {p.status} · Updated: {new Date(p.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`status-badge status-${p.status}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 1:
        return plan ? <ReviewStep plan={plan} /> : null;
      case 2:
        return plan ? (
          <div className="step-content step-content-wide">
            <h2>Manager Assessment</h2>
            <p className="step-description">
              Complete this parallel review using the same performance framework. This is not a scoring exercise;
              it's meant to surface where perceptions align and where they differ, so the IDP conversation can focus
              on the areas that matter most.
            </p>
            <div className="tip-box">
              <strong>Tip:</strong> Ground your observations in specific examples. Instead of "needs to improve communication,"
              try "I've noticed updates on the XYZ project sometimes come after decisions have already been made —
              earlier communication would help the team plan better." Specificity makes the feedback actionable.
            </div>

            <div className="assessment-category">
              <h3>Knowledge</h3>
              <div className="assessment-grid">
                <TextField label="Observed Strengths" value={plan.managerAssessment.knowledgeStrengths} onChange={(v) => updateAssessment('knowledgeStrengths', v)} multiline />
                <TextField label="Areas for Development" value={plan.managerAssessment.knowledgeDevelopment} onChange={(v) => updateAssessment('knowledgeDevelopment', v)} multiline />
              </div>
            </div>

            <div className="assessment-category">
              <h3>Delivery/Execution</h3>
              <div className="assessment-grid">
                <TextField label="Observed Strengths" value={plan.managerAssessment.deliveryStrengths} onChange={(v) => updateAssessment('deliveryStrengths', v)} multiline />
                <TextField label="Areas for Development" value={plan.managerAssessment.deliveryDevelopment} onChange={(v) => updateAssessment('deliveryDevelopment', v)} multiline />
              </div>
            </div>

            <div className="assessment-category">
              <h3>Communication & Leadership</h3>
              <div className="assessment-grid">
                <TextField label="Observed Strengths" value={plan.managerAssessment.communicationStrengths} onChange={(v) => updateAssessment('communicationStrengths', v)} multiline />
                <TextField label="Areas for Development" value={plan.managerAssessment.communicationDevelopment} onChange={(v) => updateAssessment('communicationDevelopment', v)} multiline />
              </div>
            </div>
          </div>
        ) : null;
      case 3:
        return plan ? (
          <div className="step-content">
            <h2>Finalize Review</h2>
            <p className="step-description">Review your assessment and decide whether to approve the plan or request revisions.</p>
            <div className="review-section">
              <h3>Your Manager Assessment</h3>
              {[
                { title: 'Knowledge', s: plan.managerAssessment.knowledgeStrengths, d: plan.managerAssessment.knowledgeDevelopment },
                { title: 'Delivery/Execution', s: plan.managerAssessment.deliveryStrengths, d: plan.managerAssessment.deliveryDevelopment },
                { title: 'Communication', s: plan.managerAssessment.communicationStrengths, d: plan.managerAssessment.communicationDevelopment },
              ].map(({ title, s, d }) => (
                <div key={title} className="review-sub-section">
                  <h4>{title}</h4>
                  <dl>
                    <dt>Strengths</dt><dd className="pre-wrap">{s || 'Not provided'}</dd>
                    <dt>Development</dt><dd className="pre-wrap">{d || 'Not provided'}</dd>
                  </dl>
                </div>
              ))}
            </div>
            <div className="finalize-actions">
              <button className="btn btn-success btn-lg" onClick={handleApprove}>
                Approve Plan
              </button>
              <button className="btn btn-warning btn-lg" onClick={handleRequestRevision}>
                Request Revision
              </button>
            </div>
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="page wizard-page">
      <header className="wizard-header">
        <button className="btn btn-link" onClick={() => navigate('/')}>Home</button>
        <h1>Manager Plan Review</h1>
      </header>
      <StepIndicator steps={MANAGER_STEPS} currentStep={step} />
      <div className="wizard-body">
        {renderStep()}
      </div>
      <WizardNav
        onBack={handleBack}
        onNext={step === 0 ? handleSelectPlan : step < MANAGER_STEPS.length - 1 ? handleNext : null}
        nextLabel={step === 0 ? 'Review Selected Plan' : 'Next'}
        backLabel={step === 0 ? 'Home' : 'Back'}
        disableNext={step === 0 && !selectedPlanId}
      />
    </div>
  );
}
