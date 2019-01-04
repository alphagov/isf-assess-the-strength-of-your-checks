const express = require('express')
const router = express.Router()

const testevidence =
  [
    {'name':'gas or electric bill','strength':'1', 'validity':'0','chosen':false},
    {'name':'letter from a local authority','strength':'1', 'validity':'0','chosen':false},

    {'name':'Birth or adoption certificate','strength':'2','validity':'0','chosen':false},
    {'name':'Older person’s bus pass','strength':'2','validity':'0','chosen':false},
    {'name':'Education certificate from a regulated and recognised educational institution','strength':'2','validity':'0','chosen':false},
    {'name':'Rental or purchase agreement for a residential property','strength':'2','validity':'0','chosen':false},
    {'name':'Proof of age card with a Proof of Age Standards Scheme (PASS) hologram','strength':'2','validity':'0','chosen':false},
    {'name':'Marriage certificate','strength':'2','validity':'0','chosen':false},
    {'name':'Building, contents or vehicle insurance','strength':'2','validity':'0','chosen':false},

    {'name':'UK or European passport','strength':'3','validity':'0','chosen':false},
    {'name':'Identity cards','strength':'3','validity':'0','chosen':false},
    {'name':'EU or EEA driving licences','strength':'3','validity':'0','chosen':false},
    {'name':'Bank, building society or credit union current account','strength':'3','validity':'0','chosen':false},
    {'name':'Bank savings account','strength':'3','validity':'0','chosen':false},
    {'name':'Mortgage account','strength':'3','validity':'0','chosen':false},
    {'name':'Biometric passports that meet the ICAO specifications for e-passports','strength':'3','validity':'0','chosen':false},
    {'name':'Biometric residence permit','strength':'3','validity':'0','chosen':false}
  ]

const thisEvidence = []

// Add your routes here - above the module.exports line


router.post('/set-choose-evidence-variables', function (req, res) {
  req.session.data['testevidence'] = testevidence
  res.redirect('your-risk')
})

router.post('/choose-evidence-answer', function (req, res) {

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
  else{
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
  else{
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
  if (answer.includes('1') && answer.includes('2') && answer.includes('3') && answer.includes('4')) {

  // if preset in presets is this evidence update validity
  var i;
  for (i = 0; i < testevidence.length; i++) {
    if (thisEvidence.includes(testevidence[i].name)) {
      req.session.data['testevidence'][i].validity = 1
    }
  }

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
  else{
    res.redirect('overview')
  }
})

router.post('/validity-5b-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5c']

  if (answer.includes('1') || answer.includes('2') ) {
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
  else{
    res.redirect('overview')
  }
})

router.post('/validity-5c-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-5c']

  if (answer == ( "1", "2")) {
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
  else{
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
  else{
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
  else{
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
  else{
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
    res.redirect('evidence/validity-7a')
  }
  else if (answer.includes('2')) {
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
  else{
    res.redirect('overview')
  }
})

router.post('/validity-6-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-6']
  if (answer.includes('1') && answer.includes('2') && answer.includes('3')) {
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
  else {
    res.redirect('overview')
  }
})

router.post('/validity-7a-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  let answer = req.session.data['validity-7a']
  let conditionalAnswer = req.session.data['validity-7b']
  let validityanswer = req.session.data['validity-1']

  if (answer.includes('2')) {
    res.redirect('evidence/validity-7c')
  }
  else if (conditionalAnswer.includes('1') && conditionalAnswer.includes('2')) {
    // set validity to 2
    for (i = 0; i < testevidence.length; i++) {
      if (thisEvidence.includes(testevidence[i].name)) {
          req.session.data['testevidence'][i].validity = 2
      }
    }
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
  else{
    res.redirect('overview')
  }

})

router.post('/validity-7b-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-7b']
  if (answer.includes('1') && answer.includes('2')) {
    // set validity to 2
    for (i = 0; i < testevidence.length; i++) {
      if (thisEvidence.includes(testevidence[i].name)) {
          req.session.data['testevidence'][i].validity = 2
      }
    }
    res.redirect('evidence/validity-8')
  }
  else if (answer.includes('1') || answer.includes('2')){
    res.redirect('evidence/validity-7c')
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
  else{
    res.redirect('overview')
  }
})

router.post('/validity-7c-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-7c']
  if (answer.includes('1') && answer.includes('2')) {
    // set validity to 2
    for (i = 0; i < testevidence.length; i++) {
      if (thisEvidence.includes(testevidence[i].name)) {
          req.session.data['testevidence'][i].validity = 2
      }
    }
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
  else {
    res.redirect('overview')
  }
})

router.post('/validity-8-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  if (validityanswer.includes('2')) {
    res.redirect('evidence/validity-12')
  }
  else if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else {
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
  else {
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
  else {
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
  else {
    res.redirect('overview')
  }
})

router.post('/validity-12-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-12']

  if (answer.includes('1') && answer.includes('2') && answer.includes('3') && answer.includes('4') && answer.includes('5')) {
    // set validity to 2
    for (i = 0; i < testevidence.length; i++) {
      if (thisEvidence.includes(testevidence[i].name)) {
          req.session.data['testevidence'][i].validity = 2
      }
    }
  }

  if (validityanswer.includes('3')) {
    res.redirect('evidence/validity-13')
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else {
    res.redirect('overview')
  }
})

router.post('/validity-13-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let validityanswer = req.session.data['validity-1']

  let answer = req.session.data['validity-13']

  if (answer.includes('1') || answer.includes('2')) {
    // set validity to 2
    for (i = 0; i < testevidence.length; i++) {
      if (thisEvidence.includes(testevidence[i].name)) {
          req.session.data['testevidence'][i].validity = 2
      }
    }
    if (validityanswer.includes('4')) {
      res.redirect('evidence/validity-14')
    }
    else {
      res.redirect('overview')
    }
  }
  else if (validityanswer.includes('4')) {
    res.redirect('evidence/validity-14')
  }
  else {
    res.redirect('overview')
  }
})

router.post('/validity-14-answer', function (req, res) {
  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence
  let answer = req.session.data['validity-13']

  // if preset in presets is this evidence update validity
  var i;
  for (i = 0; i < testevidence.length; i++) {
    if (thisEvidence.includes(testevidence[i].name)) {
      if (answer.includes('1')) {
        req.session.data['testevidence'][i].validity = 1
      }
      else if (answer.includes('2')) {
        req.session.data['testevidence'][i].validity = 2
      }
      else if (answer.includes('3')) {
        req.session.data['testevidence'][i].validity = 3
      }
      else if (answer.includes('4')) {
        req.session.data['testevidence'][i].validity = 4
      }
    }
  }

  res.redirect('overview')
})

router.post('/activity-0-answer', function (req, res) {

  let answer = req.session.data['validity-0a']
  let conditionalAnswer = req.session.data['validity-0b']

  if (answer.includes('2')) {
    req.session.data['activityScore'] = "N/A"
  }
  else if (conditionalAnswer.includes('1')) {
    req.session.data['activityScore'] = "1"
  }
  else if (conditionalAnswer.includes('2')) {
    req.session.data['activityScore'] = "2"
  }
  else if (conditionalAnswer.includes('3')) {
    req.session.data['activityScore'] = "3"
  }
  else if (conditionalAnswer.includes('4')) {
    req.session.data['activityScore'] = "4"
  }
  res.redirect('/fraud/fraud-start')
})

router.post('/fraud-0-answer', function (req, res) {
  let answer = req.session.data['fraud-0']

  if (answer.includes('1')) {
    res.redirect('/fraud/fraud-1')
  }
  else if (answer.includes('2')) {
    req.session.data['fraudScore'] = "0"
    res.redirect('/verification/verification-start')
  }
})

router.post('/fraud-1-answer', function (req, res) {
  let answer = req.session.data['fraud-1']

  if (answer.includes('1')) {
    res.redirect('/fraud/fraud-2')
  }
  else if (answer.includes('2')) {
    req.session.data['fraudScore'] = "1"
    res.redirect('/verification/verification-start')
  }
})

router.post('/fraud-2-answer', function (req, res) {
  let answer = req.session.data['fraud-2']

  if (answer.includes('1')) {
    req.session.data['fraudScore'] = "3"
    res.redirect('/verification/verification-start')
  }
  else if (answer.includes('2')) {
    req.session.data['fraudScore'] = "4"
    res.redirect('/verification/verification-start')
  }
})

router.post('/verification-0-answer', function (req, res) {
  let answer = req.session.data['verification-0']

  if (answer.includes('1')) {
    res.redirect('/verification/verification-1')
  }
  else if (answer.includes('2')) {
    req.session.data['verificationScore'] = "0"
    res.redirect('/overview')
  }
})

router.post('/verification-1-answer', function (req, res) {
  let answer = req.session.data['verification-1a']
  let conditionalAnswer = req.session.data['verification-1b']

  if (answer.includes('1')) {
    if ((conditionalAnswer.includes('1') || conditionalAnswer.includes('2')) && conditionalAnswer.includes('3') ) {
      req.session.data['verificationScore'] = "3"
    }
    else if (conditionalAnswer.includes('1') || conditionalAnswer.includes('2') || conditionalAnswer.includes('3') ) {
      req.session.data['verificationScore'] = "2"
    }
  }
  else {
    req.session.data['verificationScore'] = "0"
  }
  res.redirect('/overview')
})

module.exports = router
