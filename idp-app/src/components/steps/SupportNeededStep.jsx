import { TextField } from '../FormField';

export default function SupportNeededStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>Support Needed</h2>
      <p className="step-description">What support do you need to succeed in your development plan?</p>
      <TextField label="Support from Manager" value={data.fromManager} onChange={(v) => update('fromManager', v)} placeholder="What do you need from your manager? (e.g., regular 1:1s, mentorship, project opportunities)" multiline />
      <TextField label="Support from Organization" value={data.fromOrganization} onChange={(v) => update('fromOrganization', v)} placeholder="What do you need from the organization? (e.g., training budget, conference attendance, tools)" multiline />
      <TextField label="Estimated Budget" value={data.budget} onChange={(v) => update('budget', v)} placeholder="e.g., $2,000 for courses and conferences" />
      <TextField label="Time Commitment" value={data.timeCommitment} onChange={(v) => update('timeCommitment', v)} placeholder="e.g., 4 hours per week for self-study" />
    </div>
  );
}
