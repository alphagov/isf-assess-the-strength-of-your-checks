module.exports.profiles = {
  "low": {
    1: [
      {
        "name": "1",
        "evidence": [
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 2 and a validity score of 2",
        "verification": 1,
        "fraud": 2,
        "benefits": [1, 2, 3, 4],
        "descriptions": [1, 2]
      },
      {
        "name": "2",
        "evidence": [
          {"strength": 3, "validity": 2}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 3 and a validity score of 2",
        "verification": 3,
        "benefits": [36, 2, 5],
        "descriptions": [23, 3]
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
        "humanEvidence": "3 pieces of evidence with a strength score of 1 and a validity score of 1",
        "verification": 2,
        "fraud": 2,
        "activity": 3,
        "benefits": [6, 37, 38, 27, 9],
        "descriptions": [4, 5, 6]
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
        "humanEvidence": "1 piece of evidence with a strength score of 4 and a validity score of 3",
        "verification": 3,
        "fraud": 1,
        "benefits": [10, 11, 12, 13, 5],
        "descriptions": [7, 3]
      },
      {
        "name": "2",
        "evidence": [
          {"strength": 3, "validity": 3}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 3 and a validity score of 3",
        "verification": 3,
        "fraud": 1,
        "activity": 2,
        "benefits": [14, 11, 15, 13, 5],
        "descriptions": [8, 3]
      }
    ],
    2: [
      {
        "name": "3",
        "evidence": [
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence with a strength score of 2 and a validity score of 2",
        "verification": 3,
        "fraud": 1,
        "activity": 3,
        "benefits": [16, 17, 18, 8, 13, 20],
        "descriptions": [9, 3]
      },
      {
        "name": "4",
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 3 and a validity score of 3, and another with a strength score of at least 2 and a validity score of at least 2",
        "verification": 2,
        "fraud": 2,
        "activity": 2,
        "benefits": [14, 21, 22, 15, 23, 24],
        "descriptions": [10, 11]
      },
      {
        "name": "5",
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 3 and a validity score of 3, and another with a strength score of at least 2 and a validity score of at least 2",
        "verification": 3,
        "fraud": 1,
        "activity": 1,
        "benefits": [14, 21, 25, 12, 13, 5],
        "descriptions": [8, 3]
      },
      {
        "name": "6",
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 3, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 4 and a validity score of 3, and another with a strength score of at least 3 and a validity score of at least 2",
        "activity": 1,
        "verification": 2,
        "fraud": 2,
        "benefits": [26, 21, 22, 12, 27, 24],
        "descriptions": [12, 13, 11]
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
        "humanEvidence": "3 pieces of evidence with a strength score of 2 and a validity score of 2",
        "verification": 2,
        "fraud": 2,
        "activity": 2,
        "benefits": [28, 29, 15, 27, 24],
        "descriptions": [14, 11]
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
        "humanEvidence": "1 piece of evidence with a strength score of 4 and a validity score of 3",
        "verification": 3,
        "fraud": 3,
        "benefits": [26, 11, 30, 5],
        "descriptions": [7, 15]
      },
      {
        "name": "2",
        "evidence": [
          {"strength": 4, "validity": 4}
        ],
        "humanEvidence": "1 piece of evidence with a strength score of 4 and a validity score of 4",
        "verification": 3,
        "benefits": [26, 11, 5],
        "descriptions": [16, 17, 7]
      }
    ],
    2: [
      {
        "name": "3",
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 3, "validity": 3}
        ],
        "humanEvidence": "2 pieces of evidence with a strength score of 3 and a validity score of 3",
        "verification": 3,
        "fraud": 2,
        "activity": 3,
        "benefits": [31, 32, 8, 23, 5],
        "descriptions": [8, 18]
      },
      {
        "name": "4",
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 3, "validity": 3}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 4 and a validity score of 3, and another with a strength score of 3 and a validity score of at least 3",
        "verification": 3,
        "fraud": 2,
        "benefits": [26, 33, 32, 27, 5],
        "descriptions": [19, 18]
      },
      {
        "name": "5",
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "humanEvidence": "2 pieces of evidence, one with a strength score of 4 and a validity score of 3, and another with a strength score of 2 and a validity score of at least 2",
        "verification": 3,
        "fraud": 2,
        "activity": 3,
        "benefits": [26, 21, 22, 8, 27, 5],
        "descriptions": [12, 18, 13]
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
        "humanEvidence": "3 pieces of evidence, one with a strength score of 3 and a validity score of 3, and another two with a strength score of 2 and a validity score of at least 2",
        "verification": 3,
        "fraud": 3,
        "activity": 3,
        "benefits": [14, 34, 22, 8, 35, 5],
        "descriptions": [20, 21, 22]
      }
    ]
  }
}
