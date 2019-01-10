const profiles = require('../app/data/profiles.js');

module.exports.validateResponse = function(userRiskLevel, evidence, verificationScore, fraudScore, activityScore) {
  // Get all the profiles for the level of confidence we're interested in
  let levelProfiles = profiles.profiles[userRiskLevel];

  // Discard any evidence that hasn't been submitted
  let filteredEvidence = filterChosenEvidence(evidence);
  let validated = false;

  // An array to record the results of a response against a profile.
  let profileResults = [];

  // Iterate through the profiles for different required pieces of evidence
  for (var numRequiredEvidence=1; numRequiredEvidence<=Math.max(...Object.keys(levelProfiles)); numRequiredEvidence++) {
    // If there are no profiles for that number of pieces of evidence, continue
    if (levelProfiles[numRequiredEvidence] == null) { continue; }

    // Extract the profiles for the confidence level/pieces of evidence required combination.
    let requiredEvidenceCountProfiles = levelProfiles[numRequiredEvidence];

    // Iterate through all the profiles found for that combination.
    for (var j=0; j<requiredEvidenceCountProfiles.length; j++) {
      let currentProfile = requiredEvidenceCountProfiles[j];

      // A profile may have multiple different requirements for evidence. This grabs that.
      let currentProfileEvidenceRequirements = currentProfile.evidence;
      // We're going to mutate our list of evidence so that we don't use the same piece twice. Make a copy to prevent side effects (we need the original list later)
      let filteredEvidenceCopy = filteredEvidence.slice();
      // Keep track of the number of matching pieces of evidence.
      let matchingEvidenceCount = 0;

      // Iterate over all the difference evidence requirements to see if we can find a match in the supplied evidence.
      for (var k=0; k<currentProfileEvidenceRequirements.length; k++) {
        let currentEvidenceRequirements = currentProfileEvidenceRequirements[k];

        // Iterate over the "unused" evidence to match against the requirement.
        for (var l=0; l<filteredEvidenceCopy.length; l++) {

          // If the supplied evidence meets the criteria, increment the count and remove that evidence so it's not used again. Break the loop to move to the next evidence requirement.
          if (
              filteredEvidenceCopy[l].strength >= currentEvidenceRequirements.strength &&
              filteredEvidenceCopy[l].validity >= currentEvidenceRequirements.validity
            ) {
            matchingEvidenceCount++;
            filteredEvidenceCopy.splice(l, 1);
            break;
          }
        }
      }

      // Check the scores to see if the evidence matches the profile. Set the flag if it does.
      let evidenceAdequate = scoreAdequate(matchingEvidenceCount, numRequiredEvidence)
      let verificationAdequate = scoreAdequate(verificationScore, currentProfile.verification)
      let fraudAdequate = scoreAdequate(fraudScore, currentProfile.fraud)
      let activityAdequate = scoreAdequate(activityScore, currentProfile.activity)

      if (evidenceAdequate && verificationAdequate && fraudAdequate && activityAdequate) {
          validated = true
      }

      // Append a dict with the results for that profile to a dict.
      profileResults.push({
          "name": currentProfile.name,
          "overallResult": evidenceAdequate && verificationAdequate && fraudAdequate && activityAdequate,
          "evidenceResult": evidenceAdequate,
          "humanEvidence": currentProfile.humanEvidence,
          "verificationResult": verificationAdequate,
          "verificationThreshold": currentProfile.verification,
          "fraudResult": fraudAdequate,
          "fraudThreshold": currentProfile.fraud,
          "activityResult": activityAdequate,
          "activityThreshold": currentProfile.activity
      })
    }
  }

  return {"validated": validated, "profileResults": profileResults};
}

module.exports.determineHighestConfidenceAchievable = function(evidence, verificationScore, fraudScore, activityScore) {
  console.log("Sausages")
  let riskLevelValidationResults = [];
  // Run the vaidation checker for all the levels and store the results
  Object.keys(profiles.profiles).reverse().forEach(userRiskLevel => {
    let validationResult = module.exports.validateResponse(userRiskLevel, evidence, verificationScore, fraudScore, activityScore)
    riskLevelValidationResults.push({"level": userRiskLevel, "results": validationResult});
  });

  // Find the first result that has a validated profile. Results should be ordered by highest confidence first
  let highestConfidence = riskLevelValidationResults.find(function(levelResults) {
    return levelResults.results.validated === true;
  });

  return {"highestConfidenceAvailable": highestConfidence, "allResults": riskLevelValidationResults}
}

let filterChosenEvidence = function(evidence) {
  return evidence.filter(function(x) {
    return x.chosen;
  });
}

let scoreAdequate = function(score, threshold) {
  if (threshold == null) { return true; }
  return score >= threshold;
}
