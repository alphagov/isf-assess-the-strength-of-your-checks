module.exports.profiles = {
  "low": {
    1: [
      {
        "name": "1",
        "evidence": [
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 2 and a validitiy score of 2",
        "verification": 1,
        "fraud": 2
      },
      {
        "name": "2",
        "evidence": [
          {"strength": 3, "validity": 2}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 3 and a validitiy score of 2",
        "verification": 3
      }
    ],
    3: [
      {
        "name": "3",
        "evidence": [
          {"strength": 1, "validity": 1},
          {"strength": 1, "validity": 1},
          {"strength": 1, "validity": 1}
        ],
        "humanEvidence": "3 pieces of evidence with a strength score of 1 and a validitiy score of 1",
        "verification": 2,
        "fraud": 2,
        "activity": 3
      }
    ]
  },
  "medium": {
    1: [
      {
        "name": "1",
        "evidence": [
          {"strength": 4, "validity": 3}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 4 and a validitiy score of 3",
        "verification": 3,
        "fraud": 1
      },
      {
        "name": "2",
        "evidence": [
          {"strength": 3, "validity": 3}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 3 and a validitiy score of 3",
        "verification": 3,
        "fraud": 1,
        "activity": 2
      }
    ],
    2: [
      {
        "name": "3",
        "evidence": [
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence with a strength score of 2 and a validitiy score of 2",
        "verification": 3,
        "fraud": 1,
        "activity": 3
      },
      {
        "name": "4",
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 3 and a validitiy score of 3, and another with a strength score of at least 2 and a validitiy score of at least 2",
        "verification": 2,
        "fraud": 2,
        "activity": 2
      },
      {
        "name": "5",
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 3 and a validitiy score of 3, and another with a strength score of at least 2 and a validitiy score of at least 2",
        "verification": 3,
        "fraud": 1,
        "activity": 1
      },
      {
        "name": "6",
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 3, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 4 and a validitiy score of 3, and another with a strength score of at least 3 and a validitiy score of at least 2",
        "verification": 2,
        "fraud": 2
      }
    ],
    3: [
      {
        "name": "7",
        "evidence": [
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "3 pieces of evidence with a strength score of 2 and a validitiy score of 2",
        "verification": 2,
        "fraud": 2,
        "activity": 2
      }
    ]
  },
  "high": {
    1: [
      {
        "name": "1",
        "evidence": [
          {"strength": 4, "validity": 3}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 4 and a validitiy score of 3",
        "verification": 3,
        "fraud": 3
      },
      {
        "name": "2",
        "evidence": [
          {"strength": 4, "validity": 4}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 4 and a validitiy score of 4",
        "verification": 3
      }
    ],
    2: [
      {
        "name": "3",
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 3, "validity": 3}
        ],
        "humanEvidence": "2 pieces of evidence with a strength score of 3 and a validitiy score of 3",
        "verification": 3,
        "fraud": 2,
        "activity": 3
      },
      {
        "name": "4",
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 3, "validity": 3}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 4 and a validitiy score of 3, and another with a strength score of 3 and a validitiy score of at least 3",
        "verification": 3,
        "fraud": 2
      },
      {
        "name": "5",
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 4 and a validitiy score of 3, and another with a strength score of 2 and a validitiy score of at least 2",
        "verification": 3,
        "fraud": 2,
        "activity": 3
      }
    ],
    3: [
      {
        "name": "6",
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "3 pieces of evidence, one with a strength score of 3 and a validitiy score of 3, and another two with a strength score of 2 and a validitiy score of at least 2",
        "verification": 3,
        "fraud": 3,
        "activity": 3
      }
    ]
  }
}
