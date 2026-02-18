import { TextField, SelectField } from '../FormField';
import { createGoal, STRATEGIC_PILLARS } from '../../utils/idpTemplate';

// Repurposed as Section 5: Vision, Goals & Development
export default function VisionGoalsStep({ vision, goals, onVisionChange, onGoalsChange }) {
  const updateGoal = (index, field, value) => {
    const updated = goals.map((g, i) => (i === index ? { ...g, [field]: value } : g));
    onGoalsChange(updated);
  };

  const addGoal = () => {
    if (goals.length >= 4) return;
    onGoalsChange([...goals, createGoal()]);
  };

  const removeGoal = (index) => {
    if (goals.length <= 1) return;
    onGoalsChange(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="step-content step-content-wide">
      <h2>Section 5: Vision, Goals & Development</h2>
      <p className="step-description">
        Translate your vision into clear, measurable steps for the year ahead. Set 2-4 goals with milestones,
        and outline the development activities and resources that will help you achieve them.
      </p>
      <div className="tip-box">
        <strong>Tip:</strong> Dream first, edit later. Write your vision without filtering for realism. Then work backward
        to identify which parts are achievable this year and which are 3-year aspirations.
      </div>

      <div className="form-group">
        <h3>1-Year Vision</h3>
        <p className="field-hint">
          What do you want to achieve in the next 12 months? What new skills, knowledge, or responsibilities
          do you want to build? How will you measure success?
        </p>
        <TextField label="1-Year Vision" value={vision.oneYear} onChange={(v) => onVisionChange({ ...vision, oneYear: v })} placeholder="Example: By the end of 2026, I want to have led at least one cross-departmental initiative from conception to completion, built stronger data analysis skills through formal training, and deepened my relationships with three community partners." multiline required />
      </div>

      <div className="form-group">
        <h3>3-Year Vision</h3>
        <p className="field-hint">
          Where do you see yourself in three years? How might your role evolve? What impact do you hope your work will have?
        </p>
        <TextField label="3-Year Vision" value={vision.threeYear} onChange={(v) => onVisionChange({ ...vision, threeYear: v })} placeholder="Example: In three years, I see myself in a Senior Manager or Director role where I'm designing programs, not just executing them." multiline required />
      </div>

      <h3 className="goals-heading">1-Year Goals (2-4 goals)</h3>
      <p className="field-hint">
        Each goal should be specific, measurable, and tied to a timeline. Make milestones checkable:
        "Improve my writing" isn't a milestone. "Complete the grant writing workshop by March and draft
        two grant proposals independently by June" is.
      </p>

      {goals.map((goal, i) => (
        <div key={goal.id} className="goal-card">
          <div className="goal-card-header">
            <h4>Goal {i + 1}</h4>
            {goals.length > 1 && (
              <button className="btn btn-danger btn-sm" onClick={() => removeGoal(i)}>Remove</button>
            )}
          </div>
          <SelectField label="Strategic Alignment (Value/Pillar)" value={goal.strategicAlignment} onChange={(v) => updateGoal(i, 'strategicAlignment', v)} options={STRATEGIC_PILLARS} />
          <TextField label="Goal (1-Year)" value={goal.goal} onChange={(v) => updateGoal(i, 'goal', v)} placeholder="A clear statement of what you will accomplish. Start with a verb: 'Lead,' 'Develop,' 'Build,' 'Launch.'" multiline required />
          <TextField label="Milestones" value={goal.milestones} onChange={(v) => updateGoal(i, 'milestones', v)} placeholder="Q1: ... Q2: ... Q3: ... Q4: ..." multiline />
          <TextField label="Resources Needed" value={goal.resourcesNeeded} onChange={(v) => updateGoal(i, 'resourcesNeeded', v)} placeholder="Budget, tools, access, time, or information" multiline />
          <TextField label="Development Activity" value={goal.developmentActivity} onChange={(v) => updateGoal(i, 'developmentActivity', v)} placeholder="Training, mentoring, shadowing, reading, peer learning, conferences" multiline />
          <div className="form-row">
            <TextField label="Timeline / Due Date" value={goal.timeline} onChange={(v) => updateGoal(i, 'timeline', v)} placeholder="e.g., Q1-Q4 2026" />
            <TextField label="Follow-up Method" value={goal.followUpMethod} onChange={(v) => updateGoal(i, 'followUpMethod', v)} placeholder="e.g., Monthly check-in with manager" />
          </div>
          <TextField label="Sign-off / Notes" value={goal.signOffNotes} onChange={(v) => updateGoal(i, 'signOffNotes', v)} placeholder="Space for manager approval, mid-year notes, or year-end reflections" multiline />
        </div>
      ))}

      {goals.length < 4 && (
        <button className="btn btn-secondary add-action-btn" onClick={addGoal}>+ Add Another Goal</button>
      )}
    </div>
  );
}
