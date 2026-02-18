import { TextField, SelectField } from '../FormField';

const RATINGS = [
  { value: 'exceeds', label: 'Exceeds Expectations' },
  { value: 'meets', label: 'Meets Expectations' },
  { value: 'developing', label: 'Developing' },
  { value: 'needs_improvement', label: 'Needs Improvement' },
];

export default function CurrentRoleStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>Current Role Assessment</h2>
      <p className="step-description">Reflect on your current responsibilities and recent performance.</p>
      <TextField label="Key Responsibilities" value={data.responsibilities} onChange={(v) => update('responsibilities', v)} placeholder="Describe your main responsibilities in your current role" multiline required />
      <TextField label="Recent Accomplishments" value={data.recentAccomplishments} onChange={(v) => update('recentAccomplishments', v)} placeholder="What have you achieved recently that you're proud of?" multiline />
      <SelectField label="Self-Assessed Performance Rating" value={data.performanceRating} onChange={(v) => update('performanceRating', v)} options={RATINGS} />
    </div>
  );
}
