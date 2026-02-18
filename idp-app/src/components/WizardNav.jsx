export default function WizardNav({ onBack, onNext, onSave, backLabel, nextLabel, disableNext }) {
  return (
    <div className="wizard-nav">
      <div className="wizard-nav-left">
        {onBack && (
          <button className="btn btn-secondary" onClick={onBack}>
            {backLabel || 'Back'}
          </button>
        )}
      </div>
      <div className="wizard-nav-right">
        {onSave && (
          <button className="btn btn-outline" onClick={onSave}>
            Save Draft
          </button>
        )}
        {onNext && (
          <button className="btn btn-primary" onClick={onNext} disabled={disableNext}>
            {nextLabel || 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}
