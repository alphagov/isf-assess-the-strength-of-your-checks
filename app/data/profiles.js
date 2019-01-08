module.exports.profiles = {
  "none": [],
  "low": {
    1: [
      {
        "evidence": [
          {"strength": 2, "validity": 2}
        ],
        "verification": 1,
        "fraud": 2
      },
      {
        "evidence": [
          {"strength": 3, "validity": 2}
        ],
        "verification": 3
      }
    ],
    3: [
      {
        "evidence": [
          {"strength": 1, "validity": 1},
          {"strength": 1, "validity": 1},
          {"strength": 1, "validity": 1}
        ],
        "verification": 2,
        "fraud": 2,
        "activity": 3
      }
    ]
  },
  "medium": {
    1: [
      {
        "evidence": [
          {"strength": 4, "validity": 3}
        ],
        "verification": 3,
        "fraud": 1
      },
      {
        "evidence": [
          {"strength": 3, "validity": 3}
        ],
        "verification": 3,
        "fraud": 1,
        "activity": 2
      }
    ],
    2: [
      {
        "evidence": [
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2}
        ],
        "verification": 3,
        "fraud": 1,
        "activity": 3
      },
      {
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "verification": 2,
        "fraud": 2,
        "activity": 2
      },
      {
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "verification": 3,
        "fraud": 1,
        "activity": 1
      },
      {
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 3, "validity": 2}
        ],
        "verification": 2,
        "fraud": 2
      }
    ],
    3: [
      {
        "evidence": [
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2}
        ],
        "verification": 2,
        "fraud": 2,
        "activity": 2
      }
    ]
  },
  "high": {
    1: [
      {
        "evidence": [
          {"strength": 4, "validity": 3}
        ],
        "verification": 3,
        "fraud": 3
      },
      {
        "evidence": [
          {"strength": 4, "validity": 4}
        ],
        "verification": 3
      }
    ],
    2: [
      {
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 3, "validity": 3}
        ],
        "verification": 3,
        "fraud": 2,
        "activity": 3
      },
      {
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 3, "validity": 3}
        ],
        "verification": 3,
        "fraud": 2
      },
      {
        "evidence": [
          {"strength": 4, "validity": 3},
          {"strength": 2, "validity": 2}
        ],
        "verification": 3,
        "fraud": 2,
        "activity": 3
      }
    ],
    3: [
      {
        "evidence": [
          {"strength": 3, "validity": 3},
          {"strength": 2, "validity": 2},
          {"strength": 2, "validity": 2}
        ],
        "verification": 3,
        "fraud": 3,
        "activity": 3
      }
    ]
  },
  "dont-know": []
}
