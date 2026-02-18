import { TextField } from '../FormField';

// Repurposed as Section 2: Job Description Review
export default function JobDescriptionStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>Section 2: Job Description Review</h2>
      <p className="step-description">
        Review your current job description alongside the Performance Framework for your role level.
        Use this space to reflect on alignment between your day-to-day responsibilities and your official job description.
      </p>
      <div className="tip-box">
        <strong>Why this matters:</strong> Job descriptions are snapshots of a role at a moment in time. As CACF evolves, so does your work.
        This section helps you and your manager get on the same page about what your role actually looks like today — which is
        the foundation for setting meaningful goals.
      </div>

      <div className="form-group">
        <h3>Are there duties you perform regularly that aren't captured in your job description?</h3>
        <p className="field-hint">
          What do you spend time on each week that someone reading your job description wouldn't expect?
          Are there informal roles you've taken on (e.g., mentoring, troubleshooting, event planning)?
        </p>
        <TextField label="Duties Not Captured" value={data.dutiesNotCaptured} onChange={(v) => update('dutiesNotCaptured', v)} placeholder="Example: I've become the de facto point person for onboarding new hires in our department, including creating orientation schedules and check-in agendas." multiline />
      </div>

      <div className="form-group">
        <h3>Are there listed responsibilities that no longer apply or have shifted?</h3>
        <p className="field-hint">
          When you last read your job description, what felt outdated? Has a program been sunset, a tool replaced,
          or a process changed since you were hired?
        </p>
        <TextField label="Responsibilities Shifted" value={data.responsibilitiesShifted} onChange={(v) => update('responsibilitiesShifted', v)} placeholder="Example: My JD lists 'manage the annual gala logistics' but that responsibility moved to the Events team 18 months ago." multiline />
      </div>

      <div className="form-group">
        <h3>Are there areas where your role has grown beyond the original scope?</h3>
        <p className="field-hint">
          Are you operating at a level above your title? Are you leading things you weren't hired to lead?
          This is important context for your goals and any future title or compensation conversations.
        </p>
        <TextField label="Role Grown Beyond Scope" value={data.roleGrownBeyondScope} onChange={(v) => update('roleGrownBeyondScope', v)} placeholder="Example: I was hired as a Program Coordinator but now lead stakeholder engagement for two major initiatives and regularly present to the board committee." multiline />
      </div>

      <div className="tip-box">
        This reflection helps ensure your development goals are grounded in an accurate picture of your role and supports
        productive conversations with your manager about expectations, growth, and clarity.
      </div>
    </div>
  );
}
