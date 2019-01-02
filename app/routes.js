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

router.post('/validity-2-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  let answer = req.session.data['validity-2']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-4')
  }
  else if (answer.includes('2')) {
    res.redirect('evidence/validity-3')
  }
})

router.post('/validity-3-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  let validityanswer = req.session.data['validity-1']
  let answer = req.session.data['validity-3']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-4')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-4-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  let answer = req.session.data['validity-4']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-5a')
  }
  else if (answer.includes('2')) {
    res.redirect('evidence/validity-5d')
  }
})

router.post('/validity-5a-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5a']
  if (answer.includes('1') + answer.includes('2') + answer.includes('3') + answer.includes('4')) {
    res.redirect('evidence/validity-5b')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-5b-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5b']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-5c')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-5c-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5c']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-6')
  }
  else if (answer.includes('2')) {
    res.redirect('evidence/validity-6')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-5d-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5d']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-5f')
  }
  else if (answer.includes('2')) {
    res.redirect('evidence/validity-5e')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-5e-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5e']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-5g')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-5f-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5f']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-5g')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-5g-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5g']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-9')
  }
  else if (answer.includes('2')) {
    res.redirect('evidence/validity-9')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-6-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-6']
  if (answer.includes('1') + answer.includes('2') + answer.includes('3')) {
    res.redirect('evidence/validity-7a')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-7a-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  let answer = req.session.data['validity-7a']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-7b')
  }
  else if (answer.includes('2')) {
    res.redirect('evidence/validity-7c')
  }
})

router.post('/validity-7b-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-7b']
  if (answer.includes('1') + answer.includes('2')) {
    res.redirect('evidence/validity-8')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-7c-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-7c']
  if (answer.includes('1') + answer.includes('2')) {
    res.redirect('evidence/validity-8')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-8-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-8']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-9')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-9-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-9']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-10')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-10-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-10']
  if (answer.includes('1')) {
    res.redirect('evidence/validity-11')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-11-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-11']
  if (validityanswer.includes('1')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-12-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-12']
  if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-13-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-13']
  if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else if (validityanswer.includes('5')) {
    res.redirect('overview')
  }
})

router.post('/validity-14-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  res.redirect('overview')
})

module.exports = router
