import { TextField } from '../FormField';

// Repurposed as Section 1: Lookback
export default function LookbackStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>Section 1: Lookback (Prior Year Reflection)</h2>
      <p className="step-description">
        The Lookback is your opportunity to pause, reflect, and share insights from the past year.
        It is not about listing everything you did; instead, it's about highlighting the most meaningful
        experiences, results, and lessons.
      </p>
      <div className="tip-box">
        <strong>How to approach this section:</strong> Think about the past year as a story with chapters — what were the turning points?
        Don't just list tasks you completed. Focus on moments that changed something: a relationship that deepened,
        a skill that clicked, a process that broke, an idea that took hold.
      </div>

      <div className="form-group">
        <h3>Big Wins</h3>
        <p className="field-hint">
          Highlight your proudest accomplishments this year. Think about impact: What did you achieve that made a difference
          for your team, donors, partners, or community? Include both tangible outcomes (projects completed, goals met) and
          intangible outcomes (relationships built, leadership shown, personal growth).
        </p>
        <TextField label="Big Wins" value={data.bigWins} onChange={(v) => update('bigWins', v)} placeholder="Example: Led the transition to our new CRM system, training 12 staff members and reducing data entry time by 40%." multiline required />
      </div>

      <div className="form-group">
        <h3>What's Working?</h3>
        <p className="field-hint">
          Identify the practices, habits, or systems that help you succeed. Consider how these align with
          CACF's values (Curiosity, Proximity, Truth, Repair, Solidarity) and strategic pillars.
        </p>
        <TextField label="What's Working" value={data.whatsWorking} onChange={(v) => update('whatsWorking', v)} multiline />
      </div>

      <div className="form-group">
        <h3>What's Not Working?</h3>
        <p className="field-hint">
          Share obstacles or recurring challenges that made your work harder or less effective. Be honest
          but constructive — framing issues in terms of what's getting in the way of doing your best work.
        </p>
        <TextField label="What's Not Working" value={data.whatsNotWorking} onChange={(v) => update('whatsNotWorking', v)} multiline />
      </div>

      <div className="form-group">
        <h3>What Would You Change/Implement?</h3>
        <p className="field-hint">
          Suggest improvements, new ideas, or changes to how we work. Be specific — think about systems, tools, practices, or cultural shifts.
          If you had full authority for one day, what would you fix or build?
        </p>
        <TextField label="What Would You Change" value={data.whatWouldYouChange} onChange={(v) => update('whatWouldYouChange', v)} placeholder="Example: I'd implement a shared project tracker across departments so we can see dependencies and avoid last-minute fire drills." multiline />
      </div>
    </div>
  );
}
