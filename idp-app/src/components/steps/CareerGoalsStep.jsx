import { TextField } from '../FormField';

export default function CareerGoalsStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>Career Goals</h2>
      <p className="step-description">Think about where you want to go in the near and long term.</p>
      <div className="form-group">
        <h3>Short-Term Goal (6-12 months)</h3>
        <TextField label="Goal" value={data.shortTermGoal} onChange={(v) => update('shortTermGoal', v)} placeholder="What do you want to achieve in the next 6-12 months?" multiline required />
        <TextField label="Timeline" value={data.shortTermTimeline} onChange={(v) => update('shortTermTimeline', v)} placeholder="e.g., By end of Q2 2026" />
      </div>
      <div className="form-group">
        <h3>Long-Term Goal (2-5 years)</h3>
        <TextField label="Goal" value={data.longTermGoal} onChange={(v) => update('longTermGoal', v)} placeholder="Where do you see yourself in 2-5 years?" multiline required />
        <TextField label="Timeline" value={data.longTermTimeline} onChange={(v) => update('longTermTimeline', v)} placeholder="e.g., By 2028" />
      </div>
      <TextField label="Ideal Next Role" value={data.idealNextRole} onChange={(v) => update('idealNextRole', v)} placeholder="What's the next role you'd like to grow into?" />
    </div>
  );
}
