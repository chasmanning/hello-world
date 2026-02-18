import { v4 as uuidv4 } from 'uuid';

export function createBlankPlan() {
  return {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',

    // Cover / Employee Info
    employeeInfo: {
      employeeName: '',
      managerName: '',
      jobTitle: '',
      department: '',
      hireDate: '',
      periodCovered: '',
      idpConversationDate: '',
      midYearCheckInDate: '',
      yearEndReviewDate: '',
    },

    // Section 1: Lookback
    lookback: {
      bigWins: '',
      whatsWorking: '',
      whatsNotWorking: '',
      whatWouldYouChange: '',
    },

    // Section 2: Job Description Review
    jobDescriptionReview: {
      dutiesNotCaptured: '',
      responsibilitiesShifted: '',
      roleGrownBeyondScope: '',
    },

    // Section 3: Self-Assessment
    selfAssessment: {
      knowledgeStrengths: '',
      knowledgeGaps: '',
      deliveryStrengths: '',
      deliveryGaps: '',
      communicationStrengths: '',
      communicationGaps: '',
    },

    // Section 3: Manager Assessment
    managerAssessment: {
      knowledgeStrengths: '',
      knowledgeDevelopment: '',
      deliveryStrengths: '',
      deliveryDevelopment: '',
      communicationStrengths: '',
      communicationDevelopment: '',
    },

    // Section 4: Values Alignment
    valuesAlignment: {
      curiosity: { reflection: '', evidence: '', nextSteps: '' },
      proximity: { reflection: '', evidence: '', nextSteps: '' },
      truth: { reflection: '', evidence: '', nextSteps: '' },
      repair: { reflection: '', evidence: '', nextSteps: '' },
      solidarity: { reflection: '', evidence: '', nextSteps: '' },
    },

    // Section 4: Capabilities
    capabilities: {
      growthMindset: { reflection: '', nextYear: '', supportNeeded: '' },
      innovationOrientation: { reflection: '', nextYear: '', supportNeeded: '' },
      authenticityVulnerability: { reflection: '', nextYear: '', supportNeeded: '' },
      solidarityDifferentiation: { reflection: '', nextYear: '', supportNeeded: '' },
      directCommunication: { reflection: '', nextYear: '', supportNeeded: '' },
      responsibilityForLearning: { reflection: '', nextYear: '', supportNeeded: '' },
    },

    // Section 5: Vision, Goals & Development
    vision: {
      oneYear: '',
      threeYear: '',
    },

    goals: [createGoal()],
  };
}

export function createGoal() {
  return {
    id: uuidv4(),
    strategicAlignment: '',
    goal: '',
    milestones: '',
    resourcesNeeded: '',
    developmentActivity: '',
    timeline: '',
    followUpMethod: '',
    signOffNotes: '',
  };
}

export const CACF_VALUES = [
  {
    key: 'curiosity',
    name: 'Curiosity',
    description: 'We are committed to listening and learning with an openness that invites deeper exploration. We do not have all the answers and we value a growth mindset.',
  },
  {
    key: 'proximity',
    name: 'Proximity',
    description: 'Our community work benefits from getting close and being authentically connected with those who have direct and lived experience with the community trends we seek to change.',
  },
  {
    key: 'truth',
    name: 'Truth',
    description: 'We are committed to truth-telling about our collective past and our shared fates. We believe honest hindsight about where we\'ve been is necessary to help us understand our present and to create a better future.',
  },
  {
    key: 'repair',
    name: 'Repair',
    description: 'We seek opportunities to help our communities heal from past harm and to set course for a renewed and regenerative future state.',
  },
  {
    key: 'solidarity',
    name: 'Solidarity',
    description: 'We intentionally align and partner with those who have been excluded from the full benefits of our region in order to create a more equitable and inclusive place for all.',
  },
];

export const CACF_CAPABILITIES = [
  {
    key: 'growthMindset',
    name: 'Growth Mindset',
    description: 'Be willing and able to grow and change and do things differently. Go beyond what training, experience, or upbringing has taught us. Be humble, curious, and open-minded.',
  },
  {
    key: 'innovationOrientation',
    name: 'Innovation Orientation / Sense of Possibility',
    description: 'Bring a "how can we" or "how could this be possible" mindset. Question the way things have always been done in service of making change and progress.',
  },
  {
    key: 'authenticityVulnerability',
    name: 'Authenticity & Vulnerability',
    description: 'Be able to bring yourself and share yourself with the team. Be genuine and true to ourselves with each other. This is crucial to building trust.',
  },
  {
    key: 'solidarityDifferentiation',
    name: 'A Spirit of Solidarity & Differentiation',
    description: 'Recognize and value our shared fate and invest in each other\'s success. Appreciate each person\'s uniqueness and do not equate experiences or assume similar identities make us the same.',
  },
  {
    key: 'directCommunication',
    name: 'Direct Communication',
    description: 'Speak our own truth and listen deeply. Give and receive feedback thoughtfully and respectfully, recognizing this is critical for growth and accountability.',
  },
  {
    key: 'responsibilityForLearning',
    name: 'Responsibility for Learning',
    description: 'Do the personal work to dismantle internalized ideas about self and others, to see the larger system and our individual locations in it, and work together as effective change agents.',
  },
];

export const STRATEGIC_PILLARS = [
  { value: 'deepRelationships', label: 'Deep & Authentic Relationships' },
  { value: 'catalyticResources', label: 'Catalytic Resources' },
  { value: 'influentialLeadership', label: 'Influential Leadership' },
  { value: 'strongEnterprise', label: 'Strong Enterprise' },
];

export const EMPLOYEE_STEPS = [
  'Employee Info',
  'Lookback',
  'Job Description',
  'Self-Assessment',
  'Values Alignment',
  'Capabilities',
  'Vision & Goals',
  'Review & Submit',
];

export const MANAGER_STEPS = [
  'Select Plan',
  'Review Plan',
  'Manager Assessment',
  'Finalize',
];
