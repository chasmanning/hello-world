import { TextField } from '../FormField';

export default function StrengthsStep({ data, onChange }) {
  const updateStrength = (index, value) => {
    const updated = [...data.topStrengths];
    updated[index] = value;
    onChange({ ...data, topStrengths: updated });
  };

  return (
    <div className="step-content">
      <h2>Strengths</h2>
      <p className="step-description">Identify your top strengths and how you can build on them.</p>
      <div className="form-group">
        <h3>Top 3 Strengths</h3>
        {data.topStrengths.map((s, i) => (
          <TextField key={i} label={`Strength ${i + 1}`} value={s} onChange={(v) => updateStrength(i, v)} placeholder={`Describe strength #${i + 1}`} required />
        ))}
      </div>
      <TextField label="How to Leverage These Strengths" value={data.howToLeverage} onChange={(v) => onChange({ ...data, howToLeverage: v })} placeholder="How can you use these strengths to achieve your goals and contribute more to the team?" multiline />
    </div>
  );
}
