import { DateTime } from 'luxon';

export const envelopeGroups = [
  { id: 1, name: 'Needs', order: 0, budgetId: 1 },
  { id: 2, name: 'Wants', order: 1, budgetId: 1 },
  { id: 3, name: 'Saving', order: 3, budgetId: 1 },
];

export const envelopes = [
  {
    id: 1,
    uid: 'bxkaDk7g5fOqBhu8ve5-R',
    name: 'Income',
    order: 0,
    isIntake: true,
    budgetId: 1,
    months: [
      {
        id: 1,
        uid: 'PUOMTDCBjuAdlz8E2W-uI',
        month: DateTime.fromISO('2020-05').setZone('UTC').toJSDate(),
        allocated: 0,
      },
      {
        id: 2,
        uid: 'oO-5HeaSSTSfBfpXLbFaH',
        month: DateTime.fromISO('2020-06').setZone('UTC').toJSDate(),
        allocated: -1600,
      },
    ],
  },
  {
    id: 2,
    uid: 'G0_dSrlOLVZgrpG-7s1Wd',
    name: 'Rent',
    order: 1,
    budgetId: 1,
    groupId: 1,
    months: [
      {
        id: 3,
        uid: 'dH9HDXuuMI4WFlcKzEwtO',
        month: DateTime.fromISO('2020-06').setZone('UTC').toJSDate(),
        allocated: 800,
      },
    ],
  },
  {
    id: 3,
    uid: 'RBN3raOBm5uyp_WovIpvs',
    name: 'Emergency Fund',
    order: 2,
    budgetId: 1,
    groupId: 3,
    months: [
      {
        id: 4,
        uid: 'KQxEOtZ3o4hT_U5P64gyr',
        month: DateTime.fromISO('2020-06').setZone('UTC').toJSDate(),
        allocated: 500,
      },
    ],
  },
  {
    id: 4,
    uid: 'OvAZCqYwavZYbhTnDC8_e',
    name: 'Groceries',
    order: 3,
    budgetId: 1,
    groupId: 1,
    months: [
      {
        id: 5,
        uid: 'xWEsqLFuiSHn6UhhjEKwR',
        month: DateTime.fromISO('2020-06').setZone('UTC').toJSDate(),
        allocated: 200,
      },
    ],
  },
  {
    id: 5,
    uid: '-UzCjOqYiE2m2-EgtD9tb',
    name: 'Games',
    order: 4,
    budgetId: 1,
    groupId: 2,
    months: [
      {
        id: 6,
        uid: 'zBYf3mmGaJUb06vbNZBaJ',
        month: DateTime.fromISO('2020-06').setZone('UTC').toJSDate(),
        allocated: 100,
      },
    ],
  },
];
