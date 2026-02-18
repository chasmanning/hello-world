import { TextField } from '../FormField';

export default function DevelopmentAreasStep({ data, onChange }) {
  const updateArea = (index, value) => {
    const updated = [...data.areasForGrowth];
    updated[index] = value;
    onChange({ ...data, areasForGrowth: updated });
  };

  return (
    <div className="step-content">
      <h2>Development Areas</h2>
      <p className="step-description">Be honest about where you need to grow. This is the foundation of your development plan.</p>
      <div className="form-group">
        <h3>Top 3 Areas for Growth</h3>
        {data.areasForGrowth.map((a, i) => (
          <TextField key={i} label={`Area ${i + 1}`} value={a} onChange={(v) => updateArea(i, v)} placeholder={`Describe development area #${i + 1}`} required />
        ))}
      </div>
      <TextField label="Skill Gaps" value={data.skillGaps} onChange={(v) => onChange({ ...data, skillGaps: v })} placeholder="What specific skills or knowledge do you need to develop to reach your goals?" multiline />
    </div>
  );
}
