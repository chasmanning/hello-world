import { TextField, SelectField } from '../FormField';
import { createActionItem, ACTION_CATEGORIES, ACTION_STATUSES } from '../../utils/idpTemplate';

export default function ActionPlanStep({ data, onChange }) {
  const updateItem = (index, field, value) => {
    const updated = data.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(updated);
  };

  const addItem = () => {
    onChange([...data, createActionItem()]);
  };

  const removeItem = (index) => {
    if (data.length <= 1) return;
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="step-content">
      <h2>Action Plan</h2>
      <p className="step-description">Define specific development activities that will help you close skill gaps and reach your goals.</p>
      {data.map((item, i) => (
        <div key={item.id} className="action-item-card">
          <div className="action-item-header">
            <h3>Activity {i + 1}</h3>
            {data.length > 1 && (
              <button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>Remove</button>
            )}
          </div>
          <TextField label="Activity Description" value={item.activity} onChange={(v) => updateItem(i, 'activity', v)} placeholder="What will you do?" required />
          <SelectField label="Category" value={item.category} onChange={(v) => updateItem(i, 'category', v)} options={ACTION_CATEGORIES} />
          <TextField label="Target Date" value={item.targetDate} onChange={(v) => updateItem(i, 'targetDate', v)} placeholder="e.g., March 2026" />
          <TextField label="Resources Needed" value={item.resources} onChange={(v) => updateItem(i, 'resources', v)} placeholder="Tools, budget, access, etc." />
          <TextField label="Success Measure" value={item.successMeasure} onChange={(v) => updateItem(i, 'successMeasure', v)} placeholder="How will you know this is complete?" />
          <SelectField label="Status" value={item.status} onChange={(v) => updateItem(i, 'status', v)} options={ACTION_STATUSES} />
        </div>
      ))}
      <button className="btn btn-secondary add-action-btn" onClick={addItem}>+ Add Another Activity</button>
    </div>
  );
}
