import { v4 as uuidv4 } from 'uuid';

export function createBlankPlan() {
  return {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',

    // Step 1: Employee Info
    employeeInfo: {
      employeeName: '',
      jobTitle: '',
      department: '',
      managerName: '',
      planPeriod: '',
    },

    // Step 2: Current Role Assessment
    currentRole: {
      responsibilities: '',
      recentAccomplishments: '',
      performanceRating: '',
    },

    // Step 3: Career Goals
    careerGoals: {
      shortTermGoal: '',
      shortTermTimeline: '',
      longTermGoal: '',
      longTermTimeline: '',
      idealNextRole: '',
    },

    // Step 4: Strengths
    strengths: {
      topStrengths: ['', '', ''],
      howToLeverage: '',
    },

    // Step 5: Development Areas
    developmentAreas: {
      areasForGrowth: ['', '', ''],
      skillGaps: '',
    },

    // Step 6: Action Plan
    actionItems: [
      {
        id: uuidv4(),
        activity: '',
        category: 'training',
        targetDate: '',
        resources: '',
        successMeasure: '',
        status: 'not_started',
      },
    ],

    // Step 7: Support Needed
    supportNeeded: {
      fromManager: '',
      fromOrganization: '',
      budget: '',
      timeCommitment: '',
    },

    // Manager Review
    managerReview: {
      overallFeedback: '',
      approved: null,
      additionalGoals: '',
      reviewDate: '',
      checkInFrequency: 'monthly',
    },
  };
}

export function createActionItem() {
  return {
    id: uuidv4(),
    activity: '',
    category: 'training',
    targetDate: '',
    resources: '',
    successMeasure: '',
    status: 'not_started',
  };
}

export const ACTION_CATEGORIES = [
  { value: 'training', label: 'Training / Course' },
  { value: 'mentoring', label: 'Mentoring / Coaching' },
  { value: 'stretch', label: 'Stretch Assignment' },
  { value: 'reading', label: 'Reading / Self-Study' },
  { value: 'networking', label: 'Networking' },
  { value: 'certification', label: 'Certification' },
  { value: 'other', label: 'Other' },
];

export const ACTION_STATUSES = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export const CHECK_IN_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
];

export const EMPLOYEE_STEPS = [
  'Employee Info',
  'Current Role',
  'Career Goals',
  'Strengths',
  'Development Areas',
  'Action Plan',
  'Support Needed',
  'Review & Submit',
];

export const MANAGER_STEPS = [
  'Select Plan',
  'Review Plan',
  'Provide Feedback',
  'Finalize',
];
