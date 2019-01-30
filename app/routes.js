const express = require('express')
const router = express.Router()
const responseValidator = require('../lib/response_validator.js')

const testevidence =
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
    {'name':'Letter from Santa','shortname':'letter from Santa','group':'4','strength':'1','validity':'0','chosen':false},
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

const explanations =
  [
    {'element':'strength','score':'0','text':'The evidence is not strong enough to give you confidence in the person’s identity.'},
    {'element':'strength','score':'1','text':'You collect evidence that includes some basic information about the person.'},
    {'element':'strength','score':'2','text':'You know the person needed to prove their identity to get the evidence. You also know that any digital information the evidence contains is protected by cryptographic security features.'},
    {'element':'strength','score':'3','text':'You know the organisation made sure the evidence was received by the same person who applied for it.'},
    {'element':'strength','score':'4','text':'You know the organisation made sure the person matches an image they had from a trusted source.'},

    {'element':'validity','score':'0','text':'You don’t check the details of the evidence.'},
    {'element':'validity','score':'1','text':'You’ve checked the person’s details match the details held by the organisation that issued the evidence.'},
    {'element':'validity','score':'2','text':'You’ve checked details of the evidence (such as its reference number or expiry date) match the details held by the organisation that issued it.'},
    {'element':'validity','score':'3','text':'You’ve checked that any security features on the evidence are genuine.'},
    {'element':'validity','score':'4','text':'You’ve checked the chip on the passport is genuine.'},

    {'element':'activity','score':'0','text':'You don’t check the history of the identity.'},
    {'element':'activity','score':'1','text':'You know the identity has interacted with other organisations or individuals over the past 3 months.'},
    {'element':'activity','score':'2','text':'You know the identity has interacted with other organisations or individuals over the past 6 months.'},
    {'element':'activity','score':'3','text':'You know the identity has interacted with other organisations or individuals over the past 1 year.'},
    {'element':'activity','score':'4','text':'You know the identity has interacted with other organisations or individuals over the past 3 years.'},

    {'element':'fraud','score':'0','text':'You don’t check if the identity has been stolen or used fraudulently.'},
    {'element':'fraud','score':'1','text':'You’ve checked with a reliable and authoritative data source that the identity hasn’t been stolen or used fraudulently.'},
    {'element':'fraud','score':'2','text':'You’ve checked with a reliable and authoritative data source that the identity doesn’t belong to someone who’s died.'},
    {'element':'fraud','score':'3','text':'You’ve checked with at least one independent, reliable and authoritative data source that the identity hasn’t been stolen or used fraudulently.'},
    {'element':'fraud','score':'4','text':''},

    {'element':'verification','score':'0','text':"You don’t check if the person is the person they’re claiming to be."},
    {'element':'verification','score':'1','text':"You’ve checked the person knows some things about the person they’re claiming to be."},
    {'element':'verification','score':'2','text':"You’ve checked they match the photo or biometric information on the evidence."},
    {'element':'verification','score':'3','text':"You’ve checked the person can complete tasks that only the person they’re claiming to be can do."},
    {'element':'verification','score':'4','text':"You’ve checked that their biometric information matches what’s on the evidence."}
  ]

const thisEvidence = []

const highStrengthScore = []

const benefits = {
  1: "know that evidence of the claimed identity exists",
  2: "know if the evidence is genuine or valid",
  3: "know that the claimed identity is not known to be fraudulent or at a higher than usual risk of being impersonated",
  4: "be confident the person knows some things that only the claimed identity should know",
  5: "be confident the person matches either the photo or biometric information that's shown on the evidence",
  6: "trust each piece of evidence exists",
  7: "know each piece of evidence appears to be genuine",
  8: "be confident that the claimed identity exists in the real world",
  9: "have checked the person matches the photo or biometric information that's shown on the evidence, or know they can complete challenges that only the claimed identity should be able to do",
  10: "know that very strong evidence of the claimed identity exists",
  11: "know the evidence is genuine and valid",
  12: "have checked the claimed identity exists in the real world",
  13: "have checked the claimed identity is not known to be fraudulent",
  14: "have strong evidence that shows the claimed identity exists",
  15: "have records that the claimed identity exists in the real world",
  16: "have more than one piece of evidence that shows the claimed identity exists",
  17: "know one piece of evidence is genuine",
  18: "know the other piece of evidence is genuine or valid",
  19: "",
  20: "be confident the person matches either the photo or biometric information that's shown on the genuine evidence",
  21: "have another piece of evidence that shows the claimed identity exists",
  22: "know the evidence is genuine, valid or both",
  23: "know that the claimed identity is not known to be fraudulent or or at higher than usual risk of being impersonated",
  24: "know the person probably matches the photo or biometric information that's shown on the evidence, or know they can complete challenges that only the claimed identity should be able to do",
  25: "know both pieces of evidence are genuine, valid or both",
  26: "have very strong evidence that shows the claimed identity exists",
  27: "know that the claimed identity is not known to be fraudulent or at higher than usual risk of being impersonated",
  28: "have multiple pieces of evidence that show the claimed identity exists",
  29: "know each piece of evidence is genuine or valid",
  30: "be very confident the claimed identity is not known to be fraudulent or at higher than usual risk of being impersonated",
  31: "have more than one piece of strong evidence that shows the claimed identity exists",
  32: "know both pieces of evidence are genuine and valid",
  33: "have another piece of strong evidence that shows the claimed identity exists",
  34: "have more than one other piece of evidence that shows the claimed identity exists",
  35: "be very confident that the claimed identity is not known to be fraudulent or at higher than usual risk of being impersonated",
  36: "know that strong evidence of the claimed identity exists",
  37: "know each piece of evidence appears to be genuine",
  38: "be confident that the claimed identity exists in the real world",
  39: "",
  40: ""
}

const descriptions = {
  1: "the organisation that issued the evidence did basic checks to make sure the claimed identity exists in the real world (so you won't need to do an activity check)",
  2: "the claimed identity is not at significant risk of being targeted for identity fraud (so you only need a low score for the verification check)",
  3: "the person going through the identity checking process has been matched to the claimed identity through a physical or biometric comparison (as it's unlikely they're someone else, you won't need to do an identity fraud check)",
  4: "the evidence you have does not have many security features that stop it from being copied (so you’ll need to collect multiple pieces of evidence)",
  5: "the organisation that issued the evidence didn’t do many checks that the claimed identity exists in the real world (so you’ll also need to do an activity check)",
  6: "it's unlikely that someone will pretend to be the claimed identity (so you do not have to do a physical or biometric comparison)",
  7: "the organisation that issued the evidence did multiple thorough checks to make sure the claimed identity exists in the real world (so you'll only need a low score for the activity check)",
  8: "the organisation that issued the evidence did multiple checks to make sure the claimed identity exists in the real world (you’ll also need to do an activity check)",
  9: "the organisation that issued the evidence only did basic checks to make sure the claimed identity exists in the real world (so you’ll also need to do an activity check)",
  10: "the organisation that issued the evidence checked the claimed identity exists in the real world (you’ll also need to do an activity check)",
  11: "the claimed identity is not at high risk of being targeted for identity fraud (so you only need a low score for the verification check)",
  12: "the organisation that issued one of the pieces of evidence did multiple thorough checks to make sure the claimed identity exists in the real world",
  13: "the organisation that issued the other piece of evidence only did basic checks to make sure that the claimed identity exists in the real world (so you'll need to do an activity check)",
  14: "the organisation that issued the evidence only did basic checks to make sure the claimed identity exists in the real world (so you’ll need to do an activity check)",
  15: "the claimed identity is definitely not at high risk of being targeted for identity fraud",
  16: "the person going through the identity checking process is unlikely to be someone else because they've been matched to the claimed identity through a physical or biometric comparison",
  17: "the evidence is also almost definitely genuine and valid",
  18: "it’s possible the claimed identity could be targeted for identity fraud (so you need more than one piece of evidence)",
  19: "the organisation that issued the evidence did multiple thorough checks to make sure the claimed identity exists in the real world (so you do not need to do an activity check)",
  20: "the organisation that issued one of the pieces of evidence did multiple checks to make sure the claimed identity exists in the real world",
  21: "the organisation that issued the other pieces of evidence only checked the claimed identity exists in the real world (so you’ll need to do an activity check)",
  22: "the claimed identity is definitely not at high risk of being targeted for identity fraud (so you can accept weaker types of evidence)",
  23: "the organisation that issued the evidence did multiple checks to make sure the claimed identity exists in the real world (so you won't need to do an activity check)",
  24: ""
}

// Add your routes here - above the module.exports line

router.post('/set-choose-evidence-variables', function (req, res) {
  req.session.data['testevidence'] = testevidence
  req.session.data['explanations'] = explanations
  req.session.data['benefits'] = benefits
  req.session.data['descriptions'] = descriptions

  res.redirect('your-risk')
})

router.post('/choose-evidence-group-answer', function (req, res) {
  res.redirect('evidence/choose-evidence-2')
})

router.post('/choose-evidence-answer', function (req, res) {

  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  var i;
  for (i = 0; i < testevidence.length; i++) {
    if (thisEvidence.includes(testevidence[i].name)) {
      req.session.data['evidenceName'] = testevidence[i].shortname
    }
  }


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
    res.redirect('evidence/validity-start')
  }
})

router.post('/risk-answer', function (req, res) {

  let answer = req.session.data['risk-question']

  if (answer.includes('1')) {
    req.session.data['user-risk-level'] = "none"
    req.session.data['user-risk-answer'] = "None"
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
  res.redirect('overview')
})


router.post('/validity-0-answer', function (req, res) {

  let evidence = req.session.data['evidence']
  let thisEvidence = evidence
  req.session.data['thisEvidence'] = thisEvidence

  let answer = req.session.data['validity-0']

  if (answer.includes('1')) {
    res.redirect('evidence/validity-1')
  }
  else{
    res.redirect('overview')
  }
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

  let answer = req.session.data['validity-5b']
  let conditionalAnswer = req.session.data['validity-5c']

  if (answer.includes('1')) {
    res.redirect('evidence/validity-6')
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
    var i;
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
    var i;
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

  let answer = req.session.data['validity-0']

  if (answer.includes('1')) {
    res.redirect('/activity/activity-1')
  }
  else {
    req.session.data['activityScore'] = "0"
    res.redirect('overview')
  }

})

router.post('/activity-1-answer', function (req, res) {

  let answer = req.session.data['activity-1a']
  let conditionalAnswer = req.session.data['activity-1b']

  if (answer.includes('2')) {
    req.session.data['activityScore'] = "0"
    res.redirect('overview')
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

  if (answer.includes('3') && activity1Answer.includes('4')) {
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

  res.redirect('overview')

})

router.post('/activity-4-answer', function (req, res) {

  let answer = req.session.data['activity-4']
  let activity1Answer = req.session.data['activity-1b']

  if (answer.includes('3') && activity1Answer.includes('3') ) {
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

  res.redirect('overview')

})

router.post('/fraud-0-answer', function (req, res) {
  let answer = req.session.data['fraud-0']

  if (answer.includes('1')) {
    res.redirect('/fraud/fraud-1')
  }
  else if (answer.includes('2')) {
    req.session.data['fraudScore'] = "0"
    res.redirect('overview')
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
    res.redirect('overview')
  }
  else if (answer.includes('1') && answer.includes('2') && answer.includes('3')) {
    req.session.data['fraudScore'] = "1"
    res.redirect('/overview')
  }
  else {
    req.session.data['fraudScore'] = "0"
    res.redirect('overview')
  }
})

router.post('/fraud-2-answer', function (req, res) {
  let answer = req.session.data['fraud-2']

  if (answer.includes('1')) {
    res.redirect('overview')
  }
  else if (answer.includes('2')) {
    res.redirect('fraud/fraud-3')
  }
  res.redirect('overview')
})

router.post('/fraud-3-answer', function (req, res) {
  let answer = req.session.data['fraud-3']

  if (answer.includes('1')) {
    req.session.data['fraudScore'] = "3"
  }
  else if (answer.includes('2')) {
    req.session.data['fraudScore'] = "2"
  }
  res.redirect('overview')
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

router.post('/overview-answer', function (req, res) {
  let userRiskLevel = req.session.data['user-risk-level'];
  let evidence = req.session.data['testevidence'];
  let verificationScore = req.session.data['verificationScore']
  let fraudScore = req.session.data['fraudScore']
  let activityScore = req.session.data['activityScore']

  if (userRiskLevel == "dont-know") {
    let validationResults = responseValidator.determineHighestConfidenceAchievable(evidence, verificationScore, fraudScore, activityScore)
    req.session.data['result-message'] = validationResults.highestConfidenceAvailable
      ? "Your checks protect your service with a " + validationResults.highestConfidenceAvailable.level + " level of confidence."
      : "Your checks do not protect your service with any level of confidence."
    req.session.data['profile-results'] = validationResults.allResults
  } else {
    let validationResults = responseValidator.validateResponse(userRiskLevel, evidence, verificationScore, fraudScore, activityScore)
    let not = validationResults.validated ? 'look like they are' : 'might not be'
    req.session.data['result-message'] = "Your checks " + not + " appropriate for your level of confidence."
    req.session.data['profile-results'] = validationResults.profileResults
  }

  req.session.data['testevidence'].forEach(evidence => {
    if (verificationScore >= 4){
      req.session.data['stolen-evidence-message'] = "very high protection"
    } else if ((evidence.chosen && evidence.validity >= 2) || fraudScore >= 3 || verificationScore >= 3 ){
      req.session.data['stolen-evidence-message'] = "high protection"
    } else if (fraudScore >= 2 || verificationScore >= 2 ){
      req.session.data['stolen-evidence-message'] = "medium protection"
    } else if (fraudScore >= 1 ){
      req.session.data['stolen-evidence-message'] = "low protection"
    } else {
      req.session.data['stolen-evidence-message'] = "no protection"
    }

    if (verificationScore >= 4){
      req.session.data['stolen-information-message'] = "very high protection"
    } else if (fraudScore >= 3 || verificationScore >= 3 ){
      req.session.data['stolen-information-message'] = "high protection"
    } else if (fraudScore >= 2 || verificationScore >= 2 ){
      req.session.data['stolen-information-message'] = "medium protection"
    } else if (fraudScore >= 1 || verificationScore >= 1 ){
      req.session.data['stolen-information-message'] = "low protection"
    } else {
      req.session.data['stolen-information-message'] = "no protection"
    }

    if ((evidence.chosen && evidence.validity >= 4) || activityScore >= 4){
      req.session.data['created-evidence-message'] = "very high protection"
    } else if ((evidence.chosen && evidence.strength >= 3) || (evidence.chosen && evidence.strength >= 3) || fraudScore >= 3 || verificationScore >= 4) {
      req.session.data['created-evidence-message'] = "high protection"
    } else if ((evidence.chosen && evidence.validity >= 2) || activityScore >= 2 || fraudScore >= 1){
      req.session.data['created-evidence-message'] = "medium protection"
    } else if ((evidence.chosen && evidence.validity >= 1) || activityScore >= 1 || fraudScore >= 1 || verificationScore >= 3){
      req.session.data['created-evidence-message'] = "low protection"
    } else {
      req.session.data['created-evidence-message'] = "no protection"
    }

    if ((evidence.chosen && evidence.validity >= 4)){
      req.session.data['tampered-evidence-message'] = "very high protection"
    } else if ((evidence.chosen && evidence.validity >= 3) || verificationScore >= 4) {
      req.session.data['tampered-evidence-message'] = "high protection"
    } else if ((evidence.chosen && evidence.validity >= 2) || verificationScore >= 2){
      req.session.data['tampered-evidence-message'] = "medium protection"
    } else if ((evidence.chosen && evidence.validity >= 1) || fraudScore >= 1 || verificationScore >= 1){
      req.session.data['tampered-evidence-message'] = "low protection"
    } else {
      req.session.data['tampered-evidence-message'] = "no protection"
    }


  })

  res.redirect('/results')



})

module.exports = router
