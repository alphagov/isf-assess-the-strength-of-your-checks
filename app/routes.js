const express = require('express')
const router = express.Router()
const responseValidator = require('../lib/response_validator.js')

const presetEvidence =
  [
    {'capName':'UK passport','name':'UK passport','shortname':'UK passport','group':'1','strength':'4','validity':'0','chosen':false},
    {'capName':'Passport (ICAO)','name':'A passport that meets the International Civil Aviation Organisation (ICAO) specifications for machine-readable travel documents (9303)','shortname':'passport','group':'1','strength':'3','validity':'0','chosen':false},
    {'capName':'Biometric passport','name':'Biometric passports that meet the ICAO specifications for e-passports','shortname':'biometric passport','group':'1','strength':'4','validity':'0','chosen':false},
    {'capName':'US passport card','name':'US passport card','shortname':'US passport card','group':'1','strength':'3','validity':'0','chosen':false},
    {'capName':'Home Office travel document','name':'Home Office travel document','shortname':'Home Office travel document','group':'1','strength':'2','validity':'0','chosen':false},

    {'capName':'UK driving licence','name':'UK photocard driving licence','shortname':'UK driving licence','group':'2','strength':'3','validity':'0','chosen':false},
    {'capName':'EU or EEA driving licence','name':'EU or EEA driving licence','shortname':'EU or EEA driving licence','group':'2','strength':'3','validity':'0','chosen':false},
    {'capName':'Smart card','name':'Digital tachograph driver smart card','shortname':'smart card','group':'2','strength':'3','validity':'0','chosen':false},

    {'capName':'Armed forces identity card','name':'Armed forces identity card','shortname':'armed forces identity card','group':'3','strength':'3','validity':'0','chosen':false},
    {'capName':'Biometric residence permit','name':'Biometric residence permit','shortname':'biometric residence permit','group':'3','strength':'4','validity':'0','chosen':false},
    {'capName':'EU or EEA identity card','name':'An identity card from an EU or European Economic Area (EEA) country that meets the Council Regulation (EC) No 2252/2004 standards','shortname':'EU or EEA identity card','group':'3','strength':'3','validity':'0','chosen':false},
    {'capName':'EU or EEA biometric identity card','name':'An identity card from an EU or EEA country that meets the Council Regulation (EC) No 2252/2004 standards and contains biometric information','shortname':'EU or EEA biometric identity card','group':'3','strength':'4','validity':'0','chosen':false},
    {'capName':'Proof of age card','name':'Proof of age card recognised under the Proof of Age Standards Scheme (PASS)','shortname':'proof of age card','group':'3','strength':'2','validity':'0','chosen':false},
    {'capName':'Proof of age card (with reference number)','name':'Proof of age card with a Proof of Age Standards Scheme (PASS) with a reference number','shortname':'proof of age card (with reference number)','group':'3','strength':'3','validity':'0','chosen':false},
    {'capName':'NI electoral identity card','name':'Northern Ireland electoral identity card','shortname':'NI electoral identity card','group':'3','strength':'3','validity':'0','chosen':false},

    {'capName':'Gas or electric bill','name':'Gas or electric bill','shortname':'gas or electric bill','group':'4','strength':'2', 'validity':'0','chosen':false},
    {'capName':'Student loan account','name':'Student loan account','shortname':'loan account','group':'4','strength':'3','validity':'0','chosen':false},
    {'capName':'Bank, building society or credit union current account','name':'Bank, building society or credit union current account','shortname':'bank, building society or credit union current account','group':'4','strength':'3','validity':'0','chosen':false},
    {'capName':'Credit account','name':'Credit account','shortname':'credit account','group':'4','strength':'3','validity':'0','chosen':false},
    {'capName':'Mortgage account','name':'Mortgage account','shortname':'mortgage account','group':'4','strength':'3','validity':'0','chosen':false},
    {'capName':'Secured loan account','name':'Secured loan account','shortname':'secured loan account','group':'4','strength':'3','validity':'0','chosen':false},
    {'capName':'Insurance document','name':'Building, contents or vehicle insurance','shortname':'insurance document','group':'4','strength':'2','validity':'0','chosen':false},
    {'capName':'Rental or purchace agreement','name':'Rental or purchase agreement for a residential property','shortname':'rental or purchace agreement','group':'4','strength':'2','validity':'0','chosen':false},

    {'capName':'Birth or adoption certificate','name':'Birth or adoption certificate','shortname':'birth or adoption certificate','group':'5','strength':'2','validity':'0','chosen':false},
    {'capName':'Marriage certificate','name':'Marriage certificate','shortname':'marriage certificate','group':'5','strength':'2','validity':'0','chosen':false},
    {'capName':'Education certificate','name':'Education certificate from a regulated and recognised educational institution','shortname':'education certificate','group':'5','strength':'2','validity':'0','chosen':false},
    {'capName':'Firearm certificate','name':'Firearm certificate','shortname':'firearm certificate','group':'5','strength':'2','validity':'0','chosen':false},

    {'capName':'Bus pass','name':'Older person’s bus pass','shortname':'bus pass','group':'6','strength':'2','validity':'0','chosen':false},
    {'capName':'Freedom pass','name':'Freedom pass','shortname':'freedom pass','group':'6','strength':'2','validity':'0','chosen':false},
    {'capName':'Letter from a local authority','name':'Letter from a local authority','shortname':'letter from a local authority','group':'6','strength':'1', 'validity':'0','chosen':false},

  ]

const thisEvidence = []

const highStrengthScore = []

// Add your routes here - above the module.exports line

router.post('/set-choose-evidence-variables', function (req, res) {
  req.session.data['presetEvidence'] = presetEvidence
  res.redirect('your-risk')
})

router.post('/choose-evidence-group-answer', function (req, res) {
  req.session.data['overview-error'] = false

  // if other evidence chosen
  if (req.session.data['choose-evidence'].includes('other')) {
    // add the other evidence to the presetEvidence array in session
    req.session.data['presetEvidence'].push(
      {'capName':req.session.data['other-evidence-name'],'name':req.session.data['other-evidence-name'],'shortname':req.session.data['other-evidence-name'],'strength':"0",'validity':"0",'chosen':"true"}
    );
    req.session.data['presetEvidence'] = req.session.data['presetEvidence']
    // add evidence name to session
    req.session.data['evidenceName'] = req.session.data['other-evidence-name']
    // redirect to other evidence score page
    res.redirect('evidence/other-evidence')
  }
  else{
    // set thisEvidence as the shortname
    var i;
    for (i = 0; i < req.session.data['presetEvidence'].length; i++) {
      if (req.session.data['evidence'].includes(req.session.data['presetEvidence'][i].name)) {
        req.session.data['evidenceName'] = req.session.data['presetEvidence'][i].shortname
      }
    }
    // for each preset, set chosen to true if chosen
    var i;
    for (i = 0; i < presetEvidence.length; i++) {
      if (req.session.data['evidence'].includes(req.session.data['presetEvidence'][i].name)) {
        req.session.data['presetEvidence'][i].chosen = true
      }
    }
    res.redirect('evidence/validity-start')
  }
})

router.post('/other-evidence-answer', function (req, res) {

  let answer = req.session.data['other-evidence']
  // add strength score to other evidence
  var i;
  for (i = 0; i < req.session.data['presetEvidence'].length; i++) {
    if (req.session.data['evidenceName'].includes(req.session.data['presetEvidence'][i].name)) {
        req.session.data['presetEvidence'][i].strength = answer
    }
  }

  res.redirect('/evidence/validity-start')
})

router.post('/risk-answer', function (req, res) {

  let answer = req.session.data['risk-question']

  if (answer) {
    if (answer.includes('1')) {
      req.session.data['user-risk-level'] = "none"
      req.session.data['user-risk-answer'] = "None"
      res.redirect('no-risk')
    }
    else if (answer.includes('2')) {
      req.session.data['user-risk-level'] = "low"
      req.session.data['user-risk-answer'] = "Low"
    }
    else if (answer.includes('3')) {
      req.session.data['user-risk-level'] = "medium"
      req.session.data['user-risk-answer'] = "Medium"
    }
    else if (answer.includes('4')) {
      req.session.data['user-risk-level'] = "high"
      req.session.data['user-risk-answer'] = "High"
    }
    else{
      req.session.data['user-risk-level'] = "dont-know"
      req.session.data['user-risk-answer'] = "I don’t know"
    }
    req.session.data['risk-error'] = false
    res.redirect('overview')
  }
  else {
    req.session.data['risk-error'] = true
    res.redirect('your-risk')
  }
})


router.post('/validity-0-answer', function (req, res) {
  req.session.data['section-name'] = "evidence"
  let answer = req.session.data['validity-0']

  if (answer.includes('1')) {
    res.redirect('evidence/validity-1')
  }
  else{
    res.redirect('section-result')
  }
})

router.post('/validity-1-answer', function (req, res) {
  let thisEvidence = req.session.data['evidenceName']
  let answer = req.session.data['validity-1a']

  var i;
  for (i = 0; i < req.session.data['presetEvidence'].length; i++) {
    if (thisEvidence.includes(req.session.data['presetEvidence'][i].shortname)) {
      if (answer.includes('7'))  {
        req.session.data['presetEvidence'][i].validity = "0"
      }
      if (answer.includes('3') && answer.includes('4') && answer.includes('5') && answer.includes('6')) {
        req.session.data['presetEvidence'][i].validity = "4"
      }
      else if (answer.includes('2') && answer.includes('3') && answer.includes('4')) {
        req.session.data['presetEvidence'][i].validity = "3"
      }
      else if ( answer.includes('5') ) {
        req.session.data['presetEvidence'][i].validity = "3"
      }
      else if (answer.includes('2') || answer.includes('3') || answer.includes('4')) {
        req.session.data['presetEvidence'][i].validity = "2"
      }
      else if (answer.includes('1')) {
        req.session.data['presetEvidence'][i].validity = "1"
      }
      else {
        req.session.data['presetEvidence'][i].validity = "0"
      }
    }
  }

  res.redirect('section-result')
})

router.post('/activity-0-answer', function (req, res) {

  let answer = req.session.data['validity-0']
  req.session.data['section-name'] = "activity"
  req.session.data['overview-error'] = false

  if (answer.includes('1')) {
    res.redirect('/activity/activity-1')
  }
  else {
    req.session.data['activityScore'] = "0"
    res.redirect('section-result')
  }
})

router.post('/activity-1-answer', function (req, res) {
  let answer = req.session.data['activity-1a']
  let conditionalAnswer = req.session.data['activity-1b']

  if (answer.includes('2')) {
    req.session.data['activityScore'] = "0"
    res.redirect('section-result')
  }
  else {
    res.redirect('/activity/activity-2')
  }
})

router.post('/activity-2-answer', function (req, res) {

  let answer = req.session.data['activity-2']
  if (answer.includes('1')) {
    res.redirect('/activity/activity-3')
  }
  else {
    res.redirect('/activity/activity-4')
  }

})

router.post('/activity-3-answer', function (req, res) {

  let answer = req.session.data['activity-3']
  let activity1Answer = req.session.data['activity-1b']

  if (answer.includes('3') && activity1Answer.includes('3') && activity1Answer.includes('4')) {
    req.session.data['activityScore'] = "4"
  }
  else if (answer.includes('3') && activity1Answer.includes('3')) {
    req.session.data['activityScore'] = "3"
  }
  else if (answer.includes('2') && activity1Answer.includes('2')) {
    req.session.data['activityScore'] = "2"
  }
  else if (answer.includes('1') && activity1Answer.includes('1')) {
    req.session.data['activityScore'] = "1"
  }
  else {
    req.session.data['activityScore'] = "1"
  }

  res.redirect('section-result')

})

router.post('/activity-4-answer', function (req, res) {

  let answer = req.session.data['activity-4']
  let activity1Answer = req.session.data['activity-1b']

  if (answer.includes('4') && activity1Answer.includes('3') && activity1Answer.includes('4') ) {
    req.session.data['activityScore'] = "4"
  }
  else if (answer.includes('3') && activity1Answer.includes('3') ) {
    req.session.data['activityScore'] = "3"
  }
  else if (answer.includes('2') && activity1Answer.includes('2')) {
    req.session.data['activityScore'] = "2"
  }
  else if (answer.includes('1') && activity1Answer.includes('1')) {
    req.session.data['activityScore'] = "1"
  }
  else {
    req.session.data['activityScore'] = "1"
  }

  res.redirect('section-result')

})

router.post('/fraud-0-answer', function (req, res) {
  let answer = req.session.data['fraud-0']
  req.session.data['section-name'] = "fraud"
  req.session.data['overview-error'] = false

  if (answer.includes('1')) {
    res.redirect('/fraud/fraud-1')
  }
  else if (answer.includes('2')) {
    req.session.data['fraudScore'] = "0"
    res.redirect('section-result')
  }
})

router.post('/fraud-1-answer', function (req, res) {
  let answer = req.session.data['fraud-1']

  if (answer.includes('1') && answer.includes('2') && answer.includes('3') && answer.includes('4') && answer.includes('5') && answer.includes('6')) {
    req.session.data['fraudScore'] = "2"
    res.redirect('fraud/fraud-2')
  }
  else if (answer.includes('4') && answer.includes('5') && answer.includes('6')) {
    req.session.data['fraudScore'] = "1"
    res.redirect('section-result')
  }
  else if (answer.includes('1') && answer.includes('2') && answer.includes('3')) {
    req.session.data['fraudScore'] = "1"
    res.redirect('/section-result')
  }
  else {
    req.session.data['fraudScore'] = "0"
    res.redirect('section-result')
  }
})

router.post('/fraud-2-answer', function (req, res) {
  let answer = req.session.data['fraud-2']

  if (answer.includes('1')) {
    res.redirect('section-result')
  }
  else if (answer.includes('2')) {
    res.redirect('fraud/fraud-3')
  }
  res.redirect('section-result')
})

router.post('/fraud-3-answer', function (req, res) {
  let answer = req.session.data['fraud-3']

  if (answer.includes('1')) {
    req.session.data['fraudScore'] = "3"
  }
  else if (answer.includes('2')) {
    req.session.data['fraudScore'] = "2"
  }
  res.redirect('section-result')
})

router.post('/verification-0-answer', function (req, res) {
  let answer = req.session.data['verification-0']
  req.session.data['section-name'] = "verification"
  req.session.data['overview-error'] = false

  if (answer.includes('1')) {
    req.session.data['verificationScore'] = "0"
    res.redirect('/verification/verification-1')
  }
  else if (answer.includes('2')) {
    req.session.data['verificationScore'] = "0"
    res.redirect('/section-result')
  }
})

router.post('/verification-1-answer', function (req, res) {
  let answer = req.session.data['verification-1']

  if (answer.includes('3')) {
    res.redirect('/verification/verification-2')
  }
  else if (answer.includes('1')) {
    res.redirect('/verification/verification-physical-1')
  }
  else if (answer.includes('2')) {
    res.redirect('/verification/verification-biometric-1')
  }
  else {
    res.redirect('/section-result')
  }
})

router.post('/verification-2-answer', function (req, res) {
  res.redirect('/verification/verification-3a')
})

router.post('/verification-3a-answer', function (req, res) {
  let answer = req.session.data['verification-3a']
  let verification1Answer = req.session.data['verification-1']

  if (answer.includes('1')) {
    req.session.data['quality'] = "low"
    res.redirect('/verification/verification-3b')
  }
  else if (verification1Answer.includes('1')) {
    res.redirect('/verification/verification-physical-1')
  }
  else if (verification1Answer.includes('2')) {
    res.redirect('/verification/verification-biometric-1')
  }
  else {
    res.redirect('/section-result')
  }
})

router.post('/verification-3b-answer', function (req, res) {
  let answer = req.session.data['verification-3b']
  let verification1Answer = req.session.data['verification-1']

  if (answer.includes('1')) {
    req.session.data['quality'] = "medium"
    res.redirect('/verification/verification-3c')
  }
  else {
    res.redirect('/verification/verification-4')
  }
})

router.post('/verification-3c-answer', function (req, res) {
  let answer = req.session.data['verification-3c']
  let verification1Answer = req.session.data['verification-1']

  if (answer.includes('1')) {
    req.session.data['quality'] = "high"
    res.redirect('/verification/verification-4')
  }
  else {
    res.redirect('/verification/verification-4')
  }
})

router.post('/verification-4-answer', function (req, res) {
  let answerChoice = req.session.data['verification-4a']
  let answerQuantity = req.session.data['verification-4b']
  let verification1Answer = req.session.data['verification-1']
  let infoType = req.session.data['verification-2']
  let quality = req.session.data['quality']

  if ( infoType.includes('1') ) {
    if ( quality.includes('high') ) {
      if ( answerChoice.includes('2') && answerQuantity.includes('1') ) {
        req.session.data['verificationScore'] = "1"
      }
    }
    else if ( quality.includes('medium') ) {
      if ( answerChoice.includes('1') && answerQuantity.includes('2') ) {
        req.session.data['verificationScore'] = "1"
      }
      else if ( answerChoice.includes('2') && answerQuantity.includes('1') ) {
        req.session.data['verificationScore'] = "1"
      }
    }
    else if ( quality.includes('low') ) {
      if ( answerChoice.includes('1') && answerQuantity.includes('4') ) {
        req.session.data['verificationScore'] = "1"
      }
      else if ( answerChoice.includes('2') && answerQuantity.includes('2') ) {
        req.session.data['verificationScore'] = "1"
      }
    }
  }
  else {
    if ( quality.includes('high') ) {
      if ( answerChoice.includes('2') && answerQuantity.includes('2') ) {
        req.session.data['verificationScore'] = "2"
      }
      else if ( answerChoice.includes('1') && answerQuantity.includes('2') ) {
        req.session.data['verificationScore'] = "2"
      }
    }
    else if ( quality.includes('medium') ) {
      if ( answerChoice.includes('2') && answerQuantity.includes('2') ) {
        req.session.data['verificationScore'] = "2"
      }
      else if ( answerChoice.includes('1') && answerQuantity.includes('3') ) {
        req.session.data['verificationScore'] = "2"
      }
    }
    else if ( quality.includes('low') ) {
      if ( answerChoice.includes('2') && answerQuantity.includes('4') ) {
        req.session.data['verificationScore'] = "2"
      }
      else if ( answerChoice.includes('1') && answerQuantity.includes('5') ) {
        req.session.data['verificationScore'] = "2"
      }
    }
  }

  if (verification1Answer.includes('1')) {
    res.redirect('/verification/verification-physical-1')
  }
  else if (verification1Answer.includes('2')) {
    res.redirect('/verification/verification-biometric-1')
  }
  else {
    res.redirect('/section-result')
  }
})


router.post('/verification-physical-1-answer', function (req, res) {
  let answer = req.session.data['verification-physical-1']

  if (answer.includes('1')) {
    res.redirect('/verification/verification-physical-2a')
  }
  else {
    res.redirect('/verification/verification-physical-3a')
  }
})

router.post('/verification-physical-2a-answer', function (req, res) {
  let answer = req.session.data['verification-physical-2a']
  let verification1Answer = req.session.data['verification-1']
  let score = req.session.data['verificationScore']

  if (answer.includes('1') || answer.includes('2')) {
    res.redirect('/verification/verification-physical-2b')
  }
  else {
    if (score) {
    }
    else{
      req.session.data['verificationScore'] = "0"
    }
    if (verification1Answer.includes('2')) {
      res.redirect('/verification/verification-biometric-1')
    }
    else{
      res.redirect('/section-result')
    }
  }
})

router.post('/verification-physical-2b-answer', function (req, res) {
  let answer = req.session.data['verification-physical-2b']
  let verification1Answer = req.session.data['verification-1']
  let score = req.session.data['verificationScore']

  if (answer.includes('1') || answer.includes('2')) {
    res.redirect('/verification/verification-physical-2c')
  }
  else {
    if (score) {
    }
    else{
      req.session.data['verificationScore'] = "0"
    }
    if (verification1Answer.includes('2')) {
      res.redirect('/verification/verification-biometric-1')
    }
    else{
      res.redirect('/section-result')
    }
  }
})

router.post('/verification-physical-2c-answer', function (req, res) {
  let answer = req.session.data['verification-physical-2c']
  let verificationPhysical2bAnswer = req.session.data['verification-physical-2b']
  let verification1Answer = req.session.data['verification-1']
  let score = req.session.data['verificationScore']

  if (score < "3" && verificationPhysical2bAnswer.includes('1') && answer.includes('1') && answer.includes('2') && answer.includes('3') && answer.includes('4') && answer.includes('5') && answer.includes('6')) {
    req.session.data['verificationScore'] = "3"
    res.redirect('/verification/verification-physical-3a')
  }
  else if (score < "2" && verificationPhysical2bAnswer.includes('2') && answer.includes('1') && answer.includes('2') && answer.includes('3') && answer.includes('4')) {
    req.session.data['verificationScore'] = "2"
    res.redirect('/verification/verification-physical-3a')
  }
  else if (score < "1" && answer.includes('7')) {
    req.session.data['verificationScore'] = "1"
    res.redirect('/verification/verification-physical-3a')
  }
  else if (verification1Answer.includes('2')) {
    res.redirect('/verification/verification-biometric-1')
  }
  else{
    res.redirect('/section-result')
  }
})

router.post('/verification-physical-3a-answer', function (req, res) {
  let answer = req.session.data['verification-physical-3a']
  let verification1Answer = req.session.data['verification-1']
  let score = req.session.data['verificationScore']

  if (answer.includes('1')){
    res.redirect('/verification/verification-physical-3b')
  }
  else {
    if (score) {
    }
    else{
      req.session.data['verificationScore'] = "0"
    }
    if (verification1Answer.includes('2')) {
      res.redirect('/verification/verification-biometric-1')
    }
    else{
      res.redirect('/section-result')
    }
  }
})

router.post('/verification-physical-3b-answer', function (req, res) {
  res.redirect('/verification/verification-physical-3c')
})

router.post('/verification-physical-3c-answer', function (req, res) {
  let answer = req.session.data['verification-physical-3c']
  let verificationPhysical3bAnswer = req.session.data['verification-physical-3b']
  let verification1Answer = req.session.data['verification-1']
  let score = req.session.data['verificationScore']

  if (score < "3" && verificationPhysical3bAnswer.includes('1') && verificationPhysical3bAnswer.includes('2') && verificationPhysical3bAnswer.includes('3') && verificationPhysical3bAnswer.includes('4') && verificationPhysical3bAnswer.includes('5') && verificationPhysical3bAnswer.includes('6') && answer.includes('1')){
    req.session.data['verificationScore'] = "3"
  }
  else if (score < "2" && verificationPhysical3bAnswer.includes('1') && verificationPhysical3bAnswer.includes('2') && verificationPhysical3bAnswer.includes('3') && verificationPhysical3bAnswer.includes('4') && answer.includes('1')){
    req.session.data['verificationScore'] = "2"
  }
  else {
    if (score) {
    }
    else{
      req.session.data['verificationScore'] = "0"
    }
    if (verification1Answer.includes('2')) {
      res.redirect('/verification/verification-biometric-1')
    }
    else{
      res.redirect('/section-result')
    }
  }
  res.redirect('/section-result')
})

router.post('/verification-biometric-1-answer', function (req, res) {
  res.redirect('/verification/verification-biometric-2')
})
router.post('/verification-biometric-2-answer', function (req, res) {
  res.redirect('/verification/verification-biometric-3')
})
router.post('/verification-biometric-3-answer', function (req, res) {
  res.redirect('/verification/verification-biometric-4')
})
router.post('/verification-biometric-4-answer', function (req, res) {
  res.redirect('/verification/verification-biometric-5')
})


router.post('/verification-biometric-5-answer', function (req, res) {
  let biometric1 = req.session.data['verification-biometric-1']
  let biometric2 = req.session.data['verification-biometric-2']
  let biometric3 = req.session.data['verification-biometric-3']
  let biometric4 = req.session.data['verification-biometric-4']
  let biometric5 = req.session.data['verification-biometric-5']
  let score = req.session.data['verificationScore']

  if (biometric1.includes('1') && biometric1.includes('2') && biometric1.includes('3') && biometric1.includes('4') && biometric1.includes('5') && biometric1.includes('6') && biometric3.includes('3') && biometric4.includes('1') && biometric4.includes('2') && biometric5.includes('1') ) {
    req.session.data['verificationScore'] = "4"
  }
  else if (score <= "3" && biometric1.includes('1') && biometric1.includes('2') && biometric1.includes('3') && biometric1.includes('4') && biometric1.includes('5') && biometric1.includes('6') && biometric2.includes('2') && biometric3.includes('2') && biometric4.includes('1') ) {
    req.session.data['verificationScore'] = "3"
  }
  else if (score <= "2" && biometric1.includes('1') && biometric1.includes('2') && biometric1.includes('3') && biometric1.includes('4') && biometric2.includes('1') && biometric3.includes('1') ) {
    req.session.data['verificationScore'] = "2"
  }
  else if (score <= "1" && biometric5.includes('1')){
    req.session.data['verificationScore'] = "1"
  }

  res.redirect('/section-result')
})

router.post('/overview-answer', function (req, res) {
  let userRiskLevel = req.session.data['user-risk-level'];
  let evidence = req.session.data['presetEvidence'];
  let verificationScore = req.session.data['verificationScore']
  let fraudScore = req.session.data['fraudScore']
  let activityScore = req.session.data['activityScore']

  if (verificationScore && fraudScore && activityScore) {
    if (userRiskLevel == "dont-know" || userRiskLevel == "none") {
      let validationResults = responseValidator.determineHighestConfidenceAchievable(evidence, verificationScore, fraudScore, activityScore)
      req.session.data['result-message'] = validationResults.highestConfidenceAvailable
        ? "You do enough checks to have a " + validationResults.highestConfidenceAvailable.level + " confidence in an identity."
        : "You don't do enough checks to have confidence in someone’s identity."
      req.session.data['profile-results'] = validationResults.allResults
    } else {
      // get highest possible result
      let highestValidationResults = responseValidator.determineHighestConfidenceAchievable(evidence, verificationScore, fraudScore, activityScore)

      let confidence = highestValidationResults.highestConfidenceAvailable
        ? highestValidationResults.highestConfidenceAvailable.level
        : "no"

      let validationResults = responseValidator.validateResponse(userRiskLevel, evidence, verificationScore, fraudScore, activityScore)
      let content = validationResults.validated ? 'You meet the UK government’s identity standards with a ' + confidence + ' confidence in someone’s identity.' : 'You currently have ' + confidence + ' confidence in someone’s identity. You need to do some parts of the identity checking process more thoroughly to get the level of confidence you need.'
      req.session.data['result-message'] = validationResults.validated ? 'You do enough checks to have ' + userRiskLevel + ' confidence in someone’s identity' : 'You don’t do enough checks to have ' + userRiskLevel + ' confidence in someone’s identity.'
      req.session.data['result-message-content'] = content
      req.session.data['profile-results'] = validationResults.profileResults
      req.session.data['all-profiles'] = highestValidationResults.allResults
      req.session.data['confidence-met'] = validationResults.validated
    }
    req.session.data['overview-error'] = false
    res.redirect('/recommendations')
  }
  else {
    req.session.data['overview-error'] = true
    res.redirect('/overview')
  }
})

router.post('/remove-item', function (req, res) {
  var i;
  for (i = 0; i < req.session.data['presetEvidence'].length; i++) {
    if (req.session.data['removeEvidence'].includes(req.session.data['presetEvidence'][i].name)) {
      req.session.data['presetEvidence'][i].chosen = false
    }
  }
  res.redirect('/overview?remove=false&removeEvidence=')

})


router.post('/preset-answer', function (req, res) {
  req.session.data['presetEvidence'] = []
  let answer = req.session.data['preset']

  if (answer.includes('1')) {
    req.session.data['presetEvidence'].push(
      {'capName':'UK passport','name':'UK passport','shortname':'UK passport','strength':"4",'validity':"0",'chosen':"true"}
    );
    req.session.data['activityScore'] = "2"
    req.session.data['fraudScore'] = "0"
    req.session.data['verificationScore'] = "1"
  }
  else if (answer.includes('2')) {
    req.session.data['presetEvidence'].push(
      {'capName':'UK passport','name':'UK passport','shortname':'UK passport','strength':"4",'validity':"2",'chosen':"true"}
    );
    req.session.data['activityScore'] = "0"
    req.session.data['fraudScore'] = "2"
    req.session.data['verificationScore'] = "1"
  }
  else if (answer.includes('3')) {
    req.session.data['presetEvidence'].push(
      {'capName':'UK passport','name':'UK passport','shortname':'UK passport','strength':"4",'validity':"2",'chosen':"true"},
      {'capName':'UK driving licence','name':'UK driving licence','shortname':'driving licence','strength':"3",'validity':"3",'chosen':"true"},
      {'capName':'Armed forces identity card','name':'armed forces identity card','shortname':'identity card','strength':"2",'validity':"2",'chosen':"true"},
    );
    req.session.data['activityScore'] = "3"
    req.session.data['fraudScore'] = "2"
    req.session.data['verificationScore'] = "2"
  }
  else if (answer.includes('4')) {
    req.session.data['presetEvidence'].push(
      {'capName':'UK passport','name':'UK passport','shortname':'UK passport','strength':"4",'validity':"4",'chosen':"true"}
    );
    req.session.data['activityScore'] = "0"
    req.session.data['fraudScore'] = "0"
    req.session.data['verificationScore'] = "3"
  }
  res.redirect('/your-risk')
})


module.exports = router
