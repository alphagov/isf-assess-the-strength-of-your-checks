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



router.post('/validity-0-answer', function (req, res) {

  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  res.redirect('evidence/validity-1')
})

router.post('/validity-1-answer', function (req, res) {

  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  let answer = req.session.data['validity-1']

  if (answer.includes('1')) {
    res.redirect('evidence/validity-2')
  }
  else if (answer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (answer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (answer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (answer.includes('5')) {
    res.redirect('overview')
  }
})


module.exports = router
