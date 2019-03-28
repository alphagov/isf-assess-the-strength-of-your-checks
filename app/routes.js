const express = require('express')
const router = express.Router()
const responseValidator = require('../lib/response_validator.js')

const presetEvidence =
  [
    {'name':'UK passport','shortname':'UK passport','group':'1','strength':'4','validity':'0','chosen':false},
    {'name':'A passport that meets the International Civil Aviation Organisation (ICAO) specifications for machine-readable travel documents (9303)','shortname':'passport','group':'1','strength':'3','validity':'0','chosen':false},
    {'name':'Biometric passports that meet the ICAO specifications for e-passports','shortname':'biometric passport','group':'1','strength':'4','validity':'0','chosen':false},
    {'name':'US passport card','shortname':'US passport','group':'1','strength':'3','validity':'0','chosen':false},
    {'name':'Home Office travel document','shortname':'Home Office travel document','group':'1','strength':'2','validity':'0','chosen':false},

    {'name':'UK driving licence','shortname':'UK driving licence','group':'2','strength':'3','validity':'0','chosen':false},
    {'name':'EU or EEA driving licence','shortname':'EU or EEA driving licence','group':'2','strength':'3','validity':'0','chosen':false},
    {'name':'Digital tachograph driver smart card','shortname':'smart card','group':'2','strength':'3','validity':'0','chosen':false},

    {'name':'Armed forces identity card','shortname':'armed forces identity card','group':'3','strength':'3','validity':'0','chosen':false},
    {'name':'Biometric residence permit','shortname':'biometric residence permit','group':'3','strength':'3','validity':'0','chosen':false},
    {'name':'An identity card from an EU or European Economic Area (EEA) country that meets the Council Regulation (EC) No 2252/2004 standards','shortname':'EU or EEA identity card','group':'3','strength':'3','validity':'0','chosen':false},
    {'name':'An identity card from an EU or EEA country that meets the Council Regulation (EC) No 2252/2004 standards and contains biometric information','shortname':'EU or EEA biometric identity card','group':'3','strength':'4','validity':'0','chosen':false},
    {'name':'Proof of age card with a Proof of Age Standards Scheme (PASS) hologram','shortname':'proof of age card','group':'3','strength':'4','validity':'0','chosen':false},
    {'name':'Northern Ireland electoral identity card','shortname':'NI electoral identity card','group':'3','strength':'3','validity':'0','chosen':false},

    {'name':'Gas or electric bill','shortname':'gas or electric bill','group':'4','strength':'1', 'validity':'0','chosen':false},
    {'name':'Bank, building society or credit union current account','shortname':'bank, building society or credit union current account','group':'4','strength':'3','validity':'0','chosen':false},
    {'name':'Bank savings account','shortname':'savings account','group':'4','strength':'3','validity':'0','chosen':false},
    {'name':'Credit account','shortname':'credit account','group':'4','strength':'3','validity':'0','chosen':false},
    {'name':'Mortgage account','shortname':'mortgage account','group':'4','strength':'3','validity':'0','chosen':false},
    {'name':'Secured loan account','shortname':'secured loan account','group':'4','strength':'3','validity':'0','chosen':false},
    {'name':'Building, contents or vehicle insurance','shortname':'insurance document','group':'4','strength':'2','validity':'0','chosen':false},
    {'name':'Rental or purchase agreement for a residential property','shortname':'rental or purchace agreement','group':'4','strength':'2','validity':'0','chosen':false},

    {'name':'Birth or adoption certificate','shortname':'birth or adoption certificate','group':'5','strength':'2','validity':'0','chosen':false},
    {'name':'Marriage certificate','shortname':'marriage certificate','group':'5','strength':'2','validity':'0','chosen':false},
    {'name':'Education certificate from a regulated and recognised educational institution','shortname':'education certificate','group':'5','strength':'2','validity':'0','chosen':false},
    {'name':'Firearm certificate','shortname':'firearm certificate','group':'5','strength':'2','validity':'0','chosen':false},

    {'name':'Older person’s bus pass','shortname':'bus pass','group':'6','strength':'2','validity':'0','chosen':false},
    {'name':'Freedom pass','shortname':'freedom pass','group':'6','strength':'2','validity':'0','chosen':false},
    {'name':'Letter from a local authority','shortname':'letter from a local authority','group':'6','strength':'1', 'validity':'0','chosen':false},

  ]

const thisEvidence = []

const highStrengthScore = []

// Add your routes here - above the module.exports line

router.post('/set-choose-evidence-variables', function (req, res) {
  req.session.data['presetEvidence'] = presetEvidence
  res.redirect('your-risk')
})

router.post('/choose-evidence-group-answer', function (req, res) {

  // if other evidence chosen
  if (req.session.data['choose-evidence'].includes('other')) {
    // add the other evidence to the presetEvidence array in session
    req.session.data['presetEvidence'].push(
      {'name':req.session.data['other-evidence-name'],'shortname':req.session.data['other-evidence-name'],'strength':"0",'validity':"0",'chosen':"true"}
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
    if (thisEvidence.includes(req.session.data['presetEvidence'][i].name)) {
      if (answer.includes('3') && answer.includes('4') && answer.includes('5') && answer.includes('6')) {
        req.session.data['presetEvidence'][i].validity = 4
      }
      else if (answer.includes('2') && answer.includes('3') && answer.includes('4')) {
        req.session.data['presetEvidence'][i].validity = 3
      }
      else if ( answer.includes('5') ) {
        req.session.data['presetEvidence'][i].validity = 3
      }
      else if (answer.includes('2') || answer.includes('3') || answer.includes('4')) {
        req.session.data['presetEvidence'][i].validity = 2
      }
      else if (answer.includes('1')) {
        req.session.data['presetEvidence'][i].validity = 1
      }
      else {
        req.session.data['presetEvidence'][i].validity = 0
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
    res.redirect('/verification/verification-6')
  }
  else if (answer.includes('2')) {
    res.redirect('/verification/verification-11a')
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
    res.redirect('/verification/verification-6')
  }
  else if (verification1Answer.includes('2')) {
    res.redirect('/verification/verification-11a')
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
    req.session.data['verificationScore'] = "hi"
    if ( quality.includes('high') ) {
      req.session.data['verificationScore'] = "hello"
      if ( answerChoice.includes('2') && answerQuantity.includes('1') ) {
        req.session.data['verificationScore'] = "woo"
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
    res.redirect('/verification/verification-6')
  }
  else if (verification1Answer.includes('2')) {
    res.redirect('/verification/verification-11a')
  }
  else {
    res.redirect('/section-result')
  }
})

router.post('/verification-5-answer', function (req, res) {
  let answer = req.session.data['verification-5']
  let verification1Answer = req.session.data['verification-1']

  if (answer.includes('1') && verification1Answer.includes('1')) {
    res.redirect('/verification/verification-6')
  }
  else if (answer.includes('1') && verification1Answer.includes('2')) {
    res.redirect('/verification/verification-11a')
  }
  else if (answer.includes('2') && verification1Answer.includes('1')) {
    res.redirect('/verification/verification-6')
  }
  else if (answer.includes('2') && verification1Answer.includes('2')) {
    res.redirect('/verification/verification-11a')
  }
})

router.post('/verification-6-answer', function (req, res) {
  let answer = req.session.data['verification-6']

  if (answer.includes('1')) {
    res.redirect('/verification/verification-8')
  }
  else {
    res.redirect('/verification/verification-7a')
  }
})

router.post('/verification-7a-answer', function (req, res) {
  let answer = req.session.data['verification-7a']
  let verification1Answer = req.session.data['verification-1']
  let score = req.session.data['verificationScore']

  if (answer.includes('1') && answer.includes('2') && answer.includes('3')) {
    res.redirect('/verification/verification-7b')
  }
  else {
    if (score) {
    }
    else{
      req.session.data['verificationScore'] = "0"
    }
    if (verification1Answer.includes('2')) {
      res.redirect('/verification/verification-11a')
    }
    else{
      res.redirect('/section-result')
    }
  }

})

router.post('/verification-7b-answer', function (req, res) {
  let answer = req.session.data['verification-7b']

  if (answer.includes('1') && answer.includes('2') && answer.includes('3') && answer.includes('4') && answer.includes('5') && answer.includes('6') && answer.includes('7') && answer.includes('8')) {
    req.session.data['verificationScore'] = "2"
    res.redirect('/verification/verification-8')
  }
  else{
    if (score) {
    }
    else{
      req.session.data['verificationScore'] = "0"
    }
    res.redirect('/section-result')
  }
})

router.post('/verification-8-answer', function (req, res) {
  let answer = req.session.data['verification-8']
  let verification1Answer = req.session.data['verification-1']
  let score = req.session.data['verificationScore']

  if (answer.includes('1') || answer.includes('2') ) {
    res.redirect('/verification/verification-9')
  }
  else {
    if (score) {
    }
    else{
      req.session.data['verificationScore'] = "0"
    }
    if (verification1Answer.includes('2')) {
      res.redirect('/verification/verification-11a')
    }
    else{
      res.redirect('/section-result')
    }
  }
})

router.post('/verification-9-answer', function (req, res) {
  let answer = req.session.data['verification-9']
  let verification1Answer = req.session.data['verification-1']

  if (answer.includes('1') || answer.includes('2')) {
    res.redirect('/verification/verification-10')
  }
  else{
    req.session.data['verificationScore'] = "2"
    if (verification1Answer.includes('2')) {
      res.redirect('/verification/verification-11a')
    }
    else{
      res.redirect('/section-result')
    }
  }

})

router.post('/verification-10-answer', function (req, res) {
  let answer = req.session.data['verification-10']
  let verification9Answer = req.session.data['verification-9']
  let verification1Answer = req.session.data['verification-1']

  if (answer.includes('1')) {
    req.session.data['verificationScore'] = "2"
  }
  else if (answer.includes('2') && answer.includes('3') && verification9Answer.includes('3') ) {
    req.session.data['verificationScore'] = "3"
  }
  else if (answer.includes('2') && answer.includes('3') && verification9Answer.includes('2') ) {
    req.session.data['verificationScore'] = "3"
  }
  else{
    req.session.data['verificationScore'] = "3"
  }
  if (verification1Answer.includes('2')) {
    res.redirect('/verification/verification-11a')
  }
  else{
    res.redirect('/section-result')
  }
})

router.post('/verification-11a-answer', function (req, res) {
  res.redirect('/verification/verification-11b')
})

router.post('/verification-11b-answer', function (req, res) {
  let answer = req.session.data['verification-11b']

  res.redirect('/verification/verification-11c')

})

router.post('/verification-11c-answer', function (req, res) {
  let answer = req.session.data['verification-11c']
  let verification11aAnswer = req.session.data['verification-11aa']
  let verification11aConditionalAnswer = req.session.data['verification-11ab']
  let verification11bAnswer = req.session.data['verification-11b']

  if (verification11aAnswer.includes('1') && verification11aAnswer.includes('3') && verification11aConditionalAnswer.includes('1') && verification11bAnswer.includes('1') && answer.includes('1') ) {
    req.session.data['verificationScore'] = "2"
    res.redirect('/verification/verification-12a')
  }
  else if (verification11aAnswer.includes('4') && verification11aAnswer.includes('5') && verification11aConditionalAnswer.includes('2') && verification11bAnswer.includes('2') && answer.includes('2') ) {
    req.session.data['verificationScore'] = "3"
    res.redirect('/verification/verification-12a')
  }
  else if (answer.includes('3')) {
    res.redirect('/verification/verification-12a')
  }
  else {
    res.redirect('/section-result')
  }
})


router.post('/verification-12a-answer', function (req, res) {
  let answer = req.session.data['verification-12a']
  let verification11bAnswer = req.session.data['verification-11b']
  let verification11cAnswer = req.session.data['verification-11c']

  if (answer.includes('1') && verification11bAnswer.includes('1') && verification11bAnswer.includes('2') && verification11cAnswer.includes('3')) {
    req.session.data['verificationScore'] = "4"
    res.redirect('/section-result')
  }
  else if (answer.includes('2')) {
    res.redirect('/verification/verification-12b')
  }
})


router.post('/verification-12b-answer', function (req, res) {
  let answer = req.session.data['verification-12b']
  let verification11aConditionalAnswer = req.session.data['verification-11ab']
  let verification11cAnswer = req.session.data['verification-11c']
  let verification12aAnswer = req.session.data['verification-12a']
  let verification12bAnswer = req.session.data['verification-12b']

  if (
    answer.includes('1') && answer.includes('2') && validity12bAnswer.includes('1') && validity12bAnswer.includes('2') && validity11cAnswer.includes('3') && validity12aAnswer.includes('1')) {
    req.session.data['verificationScore'] = "4"
  }
  else {
    req.session.data['verificationScore'] = "3"
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
      {'name':'UK passport','shortname':'UK passport','strength':"4",'validity':"0",'chosen':"true"}
    );
    req.session.data['activityScore'] = "2"
    req.session.data['fraudScore'] = "0"
    req.session.data['verificationScore'] = "1"
  }
  else if (answer.includes('2')) {
    req.session.data['presetEvidence'].push(
      {'name':'UK passport','shortname':'UK passport','strength':"4",'validity':"2",'chosen':"true"}
    );
    req.session.data['activityScore'] = "0"
    req.session.data['fraudScore'] = "2"
    req.session.data['verificationScore'] = "1"
  }
  else if (answer.includes('3')) {
    req.session.data['presetEvidence'].push(
      {'name':'UK passport','shortname':'UK passport','strength':"4",'validity':"2",'chosen':"true"},
      {'name':'UK driving licence','shortname':'driving licence','strength':"3",'validity':"3",'chosen':"true"},
      {'name':'armed forces identity card','shortname':'identity card','strength':"2",'validity':"2",'chosen':"true"},
    );
    req.session.data['activityScore'] = "3"
    req.session.data['fraudScore'] = "2"
    req.session.data['verificationScore'] = "2"
  }
  else if (answer.includes('4')) {
    req.session.data['presetEvidence'].push(
      {'name':'UK passport','shortname':'UK passport','strength':"4",'validity':"4",'chosen':"true"}
    );
    req.session.data['activityScore'] = "0"
    req.session.data['fraudScore'] = "0"
    req.session.data['verificationScore'] = "3"
  }
  res.redirect('/your-risk')
})


module.exports = router
