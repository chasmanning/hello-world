import { TextField } from '../FormField';

// Repurposed as Section 3: Self-Assessment
export default function SelfAssessmentStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>Section 3: Self-Assessment</h2>
      <p className="step-description">
        Review the competency descriptors for your current role level. For each category, reflect on where you feel
        confident, where you're growing, and where you see gaps. Be specific — ground your assessment in examples from the past year.
      </p>
      <div className="tip-box">
        <strong>How to approach your self-assessment:</strong> This isn't about being modest or inflating your performance.
        It's about building self-awareness. The most useful self-assessments are honest, specific, and forward-looking.
        Your manager will complete a parallel review — where your assessments align builds confidence; where they diverge opens valuable conversation.
      </div>

      <div className="assessment-category">
        <h3>Knowledge</h3>
        <p className="field-hint">Breadth and depth of knowledge; how your area(s) of expertise develop over time.</p>
        <div className="assessment-grid">
          <TextField label="Strengths / Where I'm Confident" value={data.knowledgeStrengths} onChange={(v) => update('knowledgeStrengths', v)} placeholder={"Example: I've developed strong expertise in grant compliance this year. I can now independently navigate federal reporting requirements."} multiline />
          <TextField label="Areas for Growth / Gaps" value={data.knowledgeGaps} onChange={(v) => update('knowledgeGaps', v)} placeholder={"Example: I need to build a better understanding of our investment portfolio."} multiline />
        </div>
      </div>

      <div className="assessment-category">
        <h3>Delivery/Execution</h3>
        <p className="field-hint">What you're expected to deliver on and how you go about doing that.</p>
        <div className="assessment-grid">
          <TextField label="Strengths / Where I'm Confident" value={data.deliveryStrengths} onChange={(v) => update('deliveryStrengths', v)} multiline />
          <TextField label="Areas for Growth / Gaps" value={data.deliveryGaps} onChange={(v) => update('deliveryGaps', v)} multiline />
        </div>
      </div>

      <div className="assessment-category">
        <h3>Communication & Leadership</h3>
        <p className="field-hint">How you communicate and lead people and/or projects.</p>
        <div className="assessment-grid">
          <TextField label="Strengths / Where I'm Confident" value={data.communicationStrengths} onChange={(v) => update('communicationStrengths', v)} placeholder={"Example: I consistently communicate project updates to stakeholders on time."} multiline />
          <TextField label="Areas for Growth / Gaps" value={data.communicationGaps} onChange={(v) => update('communicationGaps', v)} placeholder={"Example: I struggle to give direct feedback to peers."} multiline />
        </div>
      </div>
    </div>
  );
}
