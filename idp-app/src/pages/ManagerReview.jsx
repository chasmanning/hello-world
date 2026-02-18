import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdp } from '../context/IdpContext';
import { getPlan } from '../utils/storage';
import { MANAGER_STEPS, CHECK_IN_OPTIONS } from '../utils/idpTemplate';
import { TextField, SelectField } from '../components/FormField';
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

  const updateReview = (field, value) => {
    setPlan((prev) => ({
      ...prev,
      managerReview: { ...prev.managerReview, [field]: value },
    }));
  };

  const handleApprove = () => {
    const reviewed = {
      ...plan,
      status: 'approved',
      managerReview: {
        ...plan.managerReview,
        approved: true,
        reviewDate: new Date().toISOString(),
      },
    };
    savePlan(reviewed);
    navigate('/', { state: { message: 'Plan approved!' } });
  };

  const handleRequestRevision = () => {
    const reviewed = {
      ...plan,
      status: 'draft',
      managerReview: {
        ...plan.managerReview,
        approved: false,
        reviewDate: new Date().toISOString(),
      },
    };
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
            <p className="step-description">Choose an employee's development plan to review and provide feedback.</p>
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
          <div className="step-content">
            <h2>Provide Feedback</h2>
            <p className="step-description">Share your feedback and guidance to help the employee succeed in their development plan.</p>
            <TextField
              label="Overall Feedback"
              value={plan.managerReview.overallFeedback}
              onChange={(v) => updateReview('overallFeedback', v)}
              placeholder="Share your thoughts on the employee's plan. What looks strong? What could be improved?"
              multiline
              required
            />
            <TextField
              label="Additional Goals or Suggestions"
              value={plan.managerReview.additionalGoals}
              onChange={(v) => updateReview('additionalGoals', v)}
              placeholder="Any additional development goals or activities you'd recommend?"
              multiline
            />
            <SelectField
              label="Check-In Frequency"
              value={plan.managerReview.checkInFrequency}
              onChange={(v) => updateReview('checkInFrequency', v)}
              options={CHECK_IN_OPTIONS}
            />
          </div>
        ) : null;
      case 3:
        return plan ? (
          <div className="step-content">
            <h2>Finalize Review</h2>
            <p className="step-description">Review your feedback and decide whether to approve the plan or request revisions.</p>
            <div className="review-section">
              <h3>Your Feedback</h3>
              <p>{plan.managerReview.overallFeedback || 'No feedback provided'}</p>
              {plan.managerReview.additionalGoals && (
                <>
                  <h3>Additional Suggestions</h3>
                  <p>{plan.managerReview.additionalGoals}</p>
                </>
              )}
              <h3>Check-In Frequency</h3>
              <p>{CHECK_IN_OPTIONS.find((o) => o.value === plan.managerReview.checkInFrequency)?.label || 'Monthly'}</p>
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
