const express = require('express')
const router = express.Router()

const testevidence =
  [
    {'name':'passport','strength':'3','validity':'','chosen':false},
    {'name':'driving licence','strength':'3','validity':'','chosen':false}
  ]

const thisEvidence = []

// Add your routes here - above the module.exports line

router.post('/choose-evidence-answer', function (req, res) {

  req.session.data['testevidence'] = testevidence
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  if (evidence.includes('other')) {
    res.redirect('overview')
  }
  else{
    // for each preset, set chosen to true if chosen
    var i;
    for (i = 0; i < testevidence.length; i++) {
      if (evidence.includes(testevidence[i].name)) {
        req.session.data['testevidence'][i].chosen = true
      }
    }
    res.redirect('evidence/verification-start')
  }

})

module.exports = router
