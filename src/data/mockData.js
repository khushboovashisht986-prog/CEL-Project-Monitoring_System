// CEL Project Monitoring System - Mock Data
// Extracted 1:1 from Figma reference 'Project Dashboard.png'
// Clearly identified as demonstration data

export const MOCK_CURRENT_USER = {
  name: 'Arun Kumar Shukla',
  role: 'Administrator',
  email: 'arun.shukla@cel.gov.in',
  avatarInitials: 'AS'
};


export const MOCK_USERS = [
  {
    id: 1,
    name: 'Arun Kumar Shukla',
    email: 'arun.shukla@cel.gov.in',
    role: 'Administrator',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Divya Prakash Upadhyay',
    email: 'divya.upadhyay@cel.gov.in',
    role: 'Project Manager',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Dayasindhu',
    email: 'dayasindhu@cel.gov.in',
    role: 'Project Manager',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Umakanth',
    email: 'umakanth@cel.gov.in',
    role: 'Engineer',
    status: 'Active'
  }
];

export const MOCK_HEADER_META = {
  sampleDateLabel: 'Sample data · 23 Jul 2026',
  upcomingAlertsCount: 3,
  workspaceName: 'CEL internal network',
  scopeVersion: 'Draft scope v2.0'
};

export const MOCK_PROJECTS = [
  {
    code: 'P101',
    name: 'Clearance of 27 radome assembly',
    type: 'P-series',
    manager: 'Divya Prakash Upadhyay',
    status: 'Delayed',
    completedMilestones: 0,
    totalMilestones: 3,
    nextAlert: {
      date: '23 Jul 2026 · Today',
      description: '2 days before · Machining',
      isToday: true
    },
    startDate: '2026-06-01',
    targetDate: '2026-08-15',
    delayReason: 'Composite raw material batch clearance pending quality lab inspection.',
    correctiveAction: 'Expedited test protocol approved by QA Head; batch re-test underway.',
    hodSupportStatus: 'Action Required',
    hodRemarks: 'Urgent intervention requested with quality assurance wing.',
    milestones: [
      {
        id: 'p101-m1',
        title: 'Raw material procurement & chemical purity verification',
        targetDate: '2026-07-15',
        actualDate: null,
        status: 'Delayed',
        assignee: 'Divya Prakash Upadhyay',
        note: 'Delay in test result release.'
      },
      {
        id: 'p101-m2',
        title: 'Machining of radome sub-assemblies (Batch 1)',
        targetDate: '2026-07-25',
        actualDate: null,
        status: 'Pending',
        assignee: 'Suresh Chandra',
        note: 'Scheduled 2 days after chemical verification.'
      },
      {
        id: 'p101-m3',
        title: 'Final acceptance testing & RF transparency certification',
        targetDate: '2026-08-15',
        actualDate: null,
        status: 'Pending',
        assignee: 'Divya Prakash Upadhyay',
        note: 'External agency audit required.'
      }
    ]
  },
  {
    code: 'P102',
    name: 'Radome component verification',
    type: 'P-series',
    manager: 'Divya Prakash Upadhyay',
    status: 'On track',
    completedMilestones: 2,
    totalMilestones: 4,
    nextAlert: {
      date: '29 Jul 2026',
      description: '2 days before · Inspection',
      isToday: false
    },
    startDate: '2026-05-15',
    targetDate: '2026-08-30',
    delayReason: null,
    correctiveAction: null,
    hodSupportStatus: 'Normal',
    hodRemarks: 'Inspection proceeding as per master timetable.',
    milestones: [
      {
        id: 'p102-m1',
        title: 'Dimension and geometric tolerance audit',
        targetDate: '2026-06-15',
        actualDate: '2026-06-14',
        status: 'Completed',
        assignee: 'Amit Saxena',
        note: 'Passed with zero deviations.'
      },
      {
        id: 'p102-m2',
        title: 'Ultrasonic non-destructive testing for micro-voids',
        targetDate: '2026-07-10',
        actualDate: '2026-07-09',
        status: 'Completed',
        assignee: 'Amit Saxena',
        note: 'Zero internal delamination observed.'
      },
      {
        id: 'p102-m3',
        title: 'Climatic chamber temperature cycling test',
        targetDate: '2026-07-31',
        actualDate: null,
        status: 'In Progress',
        assignee: 'Divya Prakash Upadhyay',
        note: 'Chamber cycle running stably.'
      },
      {
        id: 'p102-m4',
        title: 'Component signoff certificate issuance',
        targetDate: '2026-08-30',
        actualDate: null,
        status: 'Pending',
        assignee: 'Divya Prakash Upadhyay',
        note: 'Pending completion of environmental run.'
      }
    ]
  },
  {
    code: 'P103',
    name: 'Machining of 4 radomes',
    type: 'P-series',
    manager: 'Dayasindhu',
    status: 'On track',
    completedMilestones: 1,
    totalMilestones: 3,
    nextAlert: {
      date: '24 Jul 2026',
      description: '2 days before · Machining',
      isToday: false
    },
    startDate: '2026-06-10',
    targetDate: '2026-08-20',
    delayReason: null,
    correctiveAction: null,
    hodSupportStatus: 'Normal',
    hodRemarks: 'Tooling setup completed; machining feeds validated.',
    milestones: [
      {
        id: 'p103-m1',
        title: '5-Axis CNC fixture fabrication & calibration',
        targetDate: '2026-06-30',
        actualDate: '2026-06-28',
        status: 'Completed',
        assignee: 'Dayasindhu',
        note: 'Fixture verified on CMM.'
      },
      {
        id: 'p103-m2',
        title: 'Precision roughing & semi-finish machining of outer profile',
        targetDate: '2026-07-26',
        actualDate: null,
        status: 'In Progress',
        assignee: 'Ramesh Patel',
        note: 'Cycle time within estimated limit.'
      },
      {
        id: 'p103-m3',
        title: 'Final surface finishing and diamond polishing',
        targetDate: '2026-08-20',
        actualDate: null,
        status: 'Pending',
        assignee: 'Dayasindhu',
        note: 'Scheduled post roughing review.'
      }
    ]
  },
  {
    code: 'P104',
    name: 'Final assembly readiness',
    type: 'P-series',
    manager: 'Dayasindhu',
    status: 'Delayed',
    completedMilestones: 1,
    totalMilestones: 4,
    nextAlert: {
      date: '30 Jul 2026',
      description: 'Half time · Assembly check',
      isToday: false
    },
    startDate: '2026-05-01',
    targetDate: '2026-08-10',
    delayReason: 'Cleanroom HVAC dehumidifier unit failure caused ambient moisture rise.',
    correctiveAction: 'HVAC backup compressor engaged; room environment stabilizing within 24h.',
    hodSupportStatus: 'Under Review',
    hodRemarks: 'Preventive maintenance contract review requested.',
    milestones: [
      {
        id: 'p104-m1',
        title: 'Sub-assembly integration bench qualification',
        targetDate: '2026-05-30',
        actualDate: '2026-05-27',
        status: 'Completed',
        assignee: 'Dayasindhu',
        note: 'Passed all ESD ground checks.'
      },
      {
        id: 'p104-m2',
        title: 'Cleanroom class 10,000 certification & air shower check',
        targetDate: '2026-07-15',
        actualDate: null,
        status: 'Delayed',
        assignee: 'Ramesh Patel',
        note: 'Humidity excursion requires re-certification.'
      },
      {
        id: 'p104-m3',
        title: 'Assembly jigs and torque driver calibration',
        targetDate: '2026-07-30',
        actualDate: null,
        status: 'Pending',
        assignee: 'Dayasindhu',
        note: 'Scheduled after cleanroom clearance.'
      },
      {
        id: 'p104-m4',
        title: 'Pilot unit full assembly dry run',
        targetDate: '2026-08-10',
        actualDate: null,
        status: 'Pending',
        assignee: 'Dayasindhu',
        note: 'Critical path milestone.'
      }
    ]
  },
  {
    code: 'P201',
    name: 'Production test preparation',
    type: 'P-series',
    manager: 'Divya Prakash Upadhyay',
    status: 'On track',
    completedMilestones: 3,
    totalMilestones: 5,
    nextAlert: {
      date: '03 Aug 2026',
      description: '2 days before · Test setup',
      isToday: false
    },
    startDate: '2026-04-10',
    targetDate: '2026-09-05',
    delayReason: null,
    correctiveAction: null,
    hodSupportStatus: 'Normal',
    hodRemarks: 'Test bench automation script running reliably.',
    milestones: [
      {
        id: 'p201-m1',
        title: 'Automated test equipment (ATE) harness wiring',
        targetDate: '2026-05-10',
        actualDate: '2026-05-08',
        status: 'Completed',
        assignee: 'Divya Prakash Upadhyay',
        note: 'Passed point-to-point continuity.'
      },
      {
        id: 'p201-m2',
        title: 'Calibration of high-voltage dielectric withstand tester',
        targetDate: '2026-06-10',
        actualDate: '2026-06-09',
        status: 'Completed',
        assignee: 'Kavita Singh',
        note: 'Traceable to NABL accredited standards.'
      },
      {
        id: 'p201-m3',
        title: 'Python test automation script validation',
        targetDate: '2026-07-05',
        actualDate: '2026-07-04',
        status: 'Completed',
        assignee: 'Kavita Singh',
        note: 'All 120 automated test vectors validated.'
      },
      {
        id: 'p201-m4',
        title: 'Trial run on 5 qualification units',
        targetDate: '2026-08-05',
        actualDate: null,
        status: 'In Progress',
        assignee: 'Divya Prakash Upadhyay',
        note: 'Preparation for next alert.'
      },
      {
        id: 'p201-m5',
        title: 'Final test report & factory authorization signoff',
        targetDate: '2026-09-05',
        actualDate: null,
        status: 'Pending',
        assignee: 'Divya Prakash Upadhyay',
        note: 'Final signoff.'
      }
    ]
  },
  {
    code: 'R101',
    name: 'R&D activity',
    type: 'R-series',
    manager: 'Umakanth',
    status: 'On track',
    completedMilestones: 1,
    totalMilestones: 3,
    nextAlert: {
      date: '25 Jul 2026',
      description: '2 days before · Prototype test',
      isToday: false
    },
    startDate: '2026-05-20',
    targetDate: '2026-08-25',
    delayReason: null,
    correctiveAction: null,
    hodSupportStatus: 'Normal',
    hodRemarks: 'Prototype electrical simulation aligns with design objectives.',
    milestones: [
      {
        id: 'r101-m1',
        title: 'Circuit schematic & electromagnetic simulation',
        targetDate: '2026-06-25',
        actualDate: '2026-06-24',
        status: 'Completed',
        assignee: 'Umakanth',
        note: 'Simulation matches specifications.'
      },
      {
        id: 'r101-m2',
        title: 'First article PCB fabrication & component stuffing',
        targetDate: '2026-07-27',
        actualDate: null,
        status: 'In Progress',
        assignee: 'Deepak Rao',
        note: 'Assembled boards undergoing optical inspection.'
      },
      {
        id: 'r101-m3',
        title: 'Bench RF spectrum characterization',
        targetDate: '2026-08-25',
        actualDate: null,
        status: 'Pending',
        assignee: 'Umakanth',
        note: 'Scheduled post assembly.'
      }
    ]
  },
  {
    code: 'R102',
    name: 'Prototype evaluation',
    type: 'R-series',
    manager: 'Umakanth',
    status: 'On track',
    completedMilestones: 2,
    totalMilestones: 4,
    nextAlert: {
      date: '29 Jul 2026',
      description: 'Half time · Evaluation',
      isToday: false
    },
    startDate: '2026-04-15',
    targetDate: '2026-08-30',
    delayReason: null,
    correctiveAction: null,
    hodSupportStatus: 'Normal',
    hodRemarks: 'Burn-in test results showing stable operation without drift.',
    milestones: [
      {
        id: 'r102-m1',
        title: 'Initial power-on smoke test & DC bias verification',
        targetDate: '2026-05-15',
        actualDate: '2026-05-14',
        status: 'Completed',
        assignee: 'Deepak Rao',
        note: 'All power rails within 1% tolerance.'
      },
      {
        id: 'r102-m2',
        title: '168-Hour continuous burn-in soak test',
        targetDate: '2026-06-20',
        actualDate: '2026-06-19',
        status: 'Completed',
        assignee: 'Deepak Rao',
        note: 'Zero failures recorded during soak.'
      },
      {
        id: 'r102-m3',
        title: 'Thermal imaging under full load stress',
        targetDate: '2026-07-31',
        actualDate: null,
        status: 'In Progress',
        assignee: 'Umakanth',
        note: 'Half time evaluation alert scheduled.'
      },
      {
        id: 'r102-m4',
        title: 'Comprehensive evaluation report signoff',
        targetDate: '2026-08-30',
        actualDate: null,
        status: 'Pending',
        assignee: 'Umakanth',
        note: 'Deliverable for HOD committee.'
      }
    ]
  }
];

export const MOCK_SIDEBAR_NAV = [
  { id: 'projects', label: 'Projects', icon: 'LayoutGrid', active: true },
  { id: 'alerts', label: 'Alert history', icon: 'Bell', active: false },
  { id: 'users', label: 'Users & roles', icon: 'Users', active: false },
  { id: 'settings', label: 'Alert settings', icon: 'SlidersHorizontal', active: false }
];
