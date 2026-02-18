import { TextField } from '../FormField';
import { CACF_VALUES } from '../../utils/idpTemplate';

// Repurposed as Section 4a: Values Alignment
export default function ValuesAlignmentStep({ data, onChange }) {
  const updateValue = (valueKey, field, value) => {
    onChange({
      ...data,
      [valueKey]: { ...data[valueKey], [field]: value },
    });
  };

  return (
    <div className="step-content step-content-wide">
      <h2>Section 4: Values Alignment</h2>
      <p className="step-description">
        Connect your performance and work with CACF's values. For each value, reflect on how it showed up (or didn't)
        in your work this year. Use the three columns to move from reflection to evidence to action.
      </p>
      <div className="tip-box">
        <strong>Tip:</strong> Be honest about misalignment. If a value feels aspirational rather than practiced, say so.
        Naming the gap is the first step toward closing it — and your manager will appreciate the candor.
      </div>

      {CACF_VALUES.map((val) => (
        <div key={val.key} className="value-card">
          <div className="value-card-header">
            <h3>{val.name}</h3>
            <p className="value-description">{val.description}</p>
          </div>
          <div className="value-grid">
            <TextField label="Reflection" value={data[val.key].reflection} onChange={(v) => updateValue(val.key, 'reflection', v)} placeholder="How did this value show up in your work?" multiline />
            <TextField label="Examples / Evidence" value={data[val.key].evidence} onChange={(v) => updateValue(val.key, 'evidence', v)} placeholder="Specific examples from this year" multiline />
            <TextField label="Next Steps" value={data[val.key].nextSteps} onChange={(v) => updateValue(val.key, 'nextSteps', v)} placeholder="What will you do differently?" multiline />
          </div>
        </div>
      ))}
    </div>
  );
}
