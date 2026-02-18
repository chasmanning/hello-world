import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdp } from '../context/IdpContext';
import { createBlankPlan, EMPLOYEE_STEPS } from '../utils/idpTemplate';
import { getPlan } from '../utils/storage';
import StepIndicator from '../components/StepIndicator';
import WizardNav from '../components/WizardNav';
import EmployeeInfoStep from '../components/steps/EmployeeInfoStep';
import LookbackStep from '../components/steps/CurrentRoleStep';
import JobDescriptionStep from '../components/steps/CareerGoalsStep';
import SelfAssessmentStep from '../components/steps/StrengthsStep';
import ValuesAlignmentStep from '../components/steps/DevelopmentAreasStep';
import CapabilitiesStep from '../components/steps/ActionPlanStep';
import VisionGoalsStep from '../components/steps/SupportNeededStep';
import ReviewStep from '../components/steps/ReviewStep';

export default function EmployeeWizard() {
  const navigate = useNavigate();
  const { planId } = useParams();
  const { savePlan } = useIdp();
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (planId) {
      const existing = getPlan(planId);
      if (existing) {
        setPlan(existing);
        return;
      }
    }
    setPlan(createBlankPlan());
  }, [planId]);

  if (!plan) return null;

  const updateSection = (section, data) => {
    setPlan((prev) => ({ ...prev, [section]: data }));
    setSaved(false);
  };

  const handleSave = () => {
    savePlan(plan);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleNext = () => {
    if (step < EMPLOYEE_STEPS.length - 1) {
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

  const handleSubmit = () => {
    const submitted = { ...plan, status: 'submitted' };
    savePlan(submitted);
    navigate('/', { state: { message: 'Plan submitted for manager review!' } });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <EmployeeInfoStep data={plan.employeeInfo} onChange={(d) => updateSection('employeeInfo', d)} />;
      case 1:
        return <LookbackStep data={plan.lookback} onChange={(d) => updateSection('lookback', d)} />;
      case 2:
        return <JobDescriptionStep data={plan.jobDescriptionReview} onChange={(d) => updateSection('jobDescriptionReview', d)} />;
      case 3:
        return <SelfAssessmentStep data={plan.selfAssessment} onChange={(d) => updateSection('selfAssessment', d)} />;
      case 4:
        return <ValuesAlignmentStep data={plan.valuesAlignment} onChange={(d) => updateSection('valuesAlignment', d)} />;
      case 5:
        return <CapabilitiesStep data={plan.capabilities} onChange={(d) => updateSection('capabilities', d)} />;
      case 6:
        return <VisionGoalsStep vision={plan.vision} goals={plan.goals} onVisionChange={(d) => updateSection('vision', d)} onGoalsChange={(d) => updateSection('goals', d)} />;
      case 7:
        return <ReviewStep plan={plan} />;
      default:
        return null;
    }
  };

  const isLastStep = step === EMPLOYEE_STEPS.length - 1;

  return (
    <div className="page wizard-page">
      <header className="wizard-header">
        <button className="btn btn-link" onClick={() => navigate('/')}>Home</button>
        <h1>CACF Individual Development Plan</h1>
        {saved && <span className="save-indicator">Saved!</span>}
      </header>
      <StepIndicator steps={EMPLOYEE_STEPS} currentStep={step} />
      <div className="wizard-body">
        {renderStep()}
      </div>
      <WizardNav
        onBack={handleBack}
        onNext={isLastStep ? handleSubmit : handleNext}
        onSave={handleSave}
        nextLabel={isLastStep ? 'Submit Plan' : 'Next'}
        backLabel={step === 0 ? 'Home' : 'Back'}
      />
    </div>
  );
}
