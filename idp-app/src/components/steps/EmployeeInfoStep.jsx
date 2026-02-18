import { TextField } from '../FormField';

export default function EmployeeInfoStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>Employee Information</h2>
      <p className="step-description">Let's start with some basic information about you and your role.</p>
      <TextField label="Employee Name" value={data.employeeName} onChange={(v) => update('employeeName', v)} placeholder="Your full name" required />
      <TextField label="Job Title" value={data.jobTitle} onChange={(v) => update('jobTitle', v)} placeholder="Current job title" required />
      <TextField label="Department" value={data.department} onChange={(v) => update('department', v)} placeholder="Your department" />
      <TextField label="Manager Name" value={data.managerName} onChange={(v) => update('managerName', v)} placeholder="Your manager's name" />
      <TextField label="Plan Period" value={data.planPeriod} onChange={(v) => update('planPeriod', v)} placeholder="e.g., 2026 Q1-Q4" />
    </div>
  );
}
