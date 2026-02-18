import { TextField } from '../FormField';
import { CACF_CAPABILITIES } from '../../utils/idpTemplate';

// Repurposed as Section 4b: Capabilities
export default function CapabilitiesStep({ data, onChange }) {
  const updateCapability = (capKey, field, value) => {
    onChange({
      ...data,
      [capKey]: { ...data[capKey], [field]: value },
    });
  };

  return (
    <div className="step-content step-content-wide">
      <h2>Section 4: Capabilities</h2>
      <p className="step-description">
        These six capabilities describe the personal capacities we need to do equity-centered work.
        They are developmental — you're not expected to have arrived, but you are expected to be on the journey.
      </p>
      <div className="tip-box">
        <strong>Think about:</strong> Which of these capabilities feels most natural to you right now?
        Which one makes you uncomfortable, and what might that discomfort be telling you?
        Where has a colleague modeled one of these competencies in a way that taught you something?
      </div>

      {CACF_CAPABILITIES.map((cap) => (
        <div key={cap.key} className="capability-card">
          <div className="capability-card-header">
            <h3>{cap.name}</h3>
            <p className="capability-description">{cap.description}</p>
          </div>
          <div className="capability-grid">
            <TextField label="Reflection" value={data[cap.key].reflection} onChange={(v) => updateCapability(cap.key, 'reflection', v)} placeholder="How has this capability shown up in your work?" multiline />
            <TextField label="What will you do next year?" value={data[cap.key].nextYear} onChange={(v) => updateCapability(cap.key, 'nextYear', v)} placeholder="Specific actions to develop this capability" multiline />
            <TextField label="Support needed" value={data[cap.key].supportNeeded} onChange={(v) => updateCapability(cap.key, 'supportNeeded', v)} placeholder="What support do you need?" multiline />
          </div>
        </div>
      ))}
    </div>
  );
}
