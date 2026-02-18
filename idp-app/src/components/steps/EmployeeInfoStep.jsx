import { TextField } from '../FormField';

export default function EmployeeInfoStep({ data, onChange }) {
  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-content">
      <h2>2026 Individual Development Plan</h2>
      <p className="step-description">
        The IDP is a collaborative process to support your growth while advancing CACF's mission.
        Use this workbook to reflect on the past year, align your vision with our values and competencies,
        set measurable goals, and turn those goals into an actionable plan with clear accountability.
      </p>
      <div className="tip-box">
        <strong>Tip:</strong> This workbook is designed to be completed over time, not in one sitting.
        Give yourself space to reflect honestly. There are no wrong answers — the goal is self-awareness, alignment, and growth.
      </div>
      <div className="form-row">
        <TextField label="Employee Name" value={data.employeeName} onChange={(v) => update('employeeName', v)} required />
        <TextField label="Manager Name" value={data.managerName} onChange={(v) => update('managerName', v)} required />
      </div>
      <div className="form-row">
        <TextField label="Current Job Title" value={data.jobTitle} onChange={(v) => update('jobTitle', v)} required />
        <TextField label="Department" value={data.department} onChange={(v) => update('department', v)} />
      </div>
      <div className="form-row">
        <TextField label="Hire Date" value={data.hireDate} onChange={(v) => update('hireDate', v)} />
        <TextField label="Period Covered" value={data.periodCovered} onChange={(v) => update('periodCovered', v)} placeholder="e.g., January – December 2026" />
      </div>
      <div className="form-row">
        <TextField label="IDP Conversation Date" value={data.idpConversationDate} onChange={(v) => update('idpConversationDate', v)} />
        <TextField label="Mid-Year Check-In Date" value={data.midYearCheckInDate} onChange={(v) => update('midYearCheckInDate', v)} />
      </div>
      <TextField label="Year-End Review Date" value={data.yearEndReviewDate} onChange={(v) => update('yearEndReviewDate', v)} />
    </div>
  );
}
