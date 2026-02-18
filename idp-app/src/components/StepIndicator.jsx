export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="step-indicator">
      {steps.map((label, i) => (
        <div key={i} className={`step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}>
          <div className="step-number">{i < currentStep ? '✓' : i + 1}</div>
          <span className="step-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
