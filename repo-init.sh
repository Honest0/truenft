#!/bin/bash -e
 
# sanity check
touch .gitattributes
 
 
# the branch HEAD name is == github-health-files
echo "Setting up .github repo health files...."
# <!-- SETUP '.github/~' -->
mkdir -p -v .github/workflows
mkdir -p -v .github/ISSUE_TEMPLATE
cd .github
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/COMMUNITY_GUIDELINES.md --output COMMUNITY_GUIDELINES.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/CLA.md --output CLA.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/SECURITY.md --output SECURITY.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/SUPPORT.md --output SUPPORT.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/CONTRIBUTING.md --output CONTRIBUTING.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/PULL_REQUEST_TEMPLATE.md --output PULL_REQUEST_TEMPLATE.md
 
cd ISSUE_TEMPLATE
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/ISSUE_TEMPLATE/feature_request.md --output feature_request.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/ISSUE_TEMPLATE/bug_report.md --output bug_report.md 
touch action.yaml
cd .. 
 
# <-- STILL in .github/ dir -->
cd workflows/
touch  .github/workflows/.gitkeep
https://raw.githubusercontent.com/freight-chain/boilerplate/github-health-files/.github/workflows/files-changed.yaml
# we can also download this https://raw.githubusercontent.com/freight-chain/boilerplate/master/.github/workflows/files-changed.yaml
 cd ..
 cd ..
 
# <-- ROOT OF REPOSITORY DIRECTORY -->
echo "Setting up Repository Boilerplate Files"
curl https://raw.githubusercontent.com/freight-chain/boilerplate/master/.codeclimate.yml --output .codeclimate.yml
curl https://raw.githubusercontent.com/freight-chain/boilerplate/master/VERSIONING.md --output VERSIONING.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/master/CONTRIBUTING.md --output CONTRIBUTING.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/master/SECURITY.md --output SECURITY.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/master/SUPPORT.md --output SUPPORT.md
curl https://raw.githubusercontent.com/freight-chain/boilerplate/master/BUILDING.md --output BUILDING.md
 
echo "Setting up corporate polices"
curl https://raw.githubusercontent.com/freight-trust/legal/master/src/terms-of-service.md --output TERMS_OF_SERVICE.md
curl https://raw.githubusercontent.com/freight-trust/legal/master/src/disclaimer.md --output DISCLAIMER.md
curl https://raw.githubusercontent.com/freight-trust/legal/master/src/data-breach-response-policy.md --output DATA_BREACH_RESPONSE.md
 
# COMPLIANCE
echo "Setting up CCPA (California) polices"
curl https://raw.githubusercontent.com/freight-trust/legal/master/src/CCPA.adoc --output CCPA.adoc
 
echo "stderr: gdpr files not included..."
 
# CORP 
echo "Setting up corporate IT policies"
curl https://gitlab.com/fr8/omnibus/-/raw/prod/preview-src/corporate/irp.adoc --output INCIDENT_RESPONSE_PLAN.adoc
curl https://gitlab.com/fr8/omnibus/-/raw/prod/preview-src/corporate/defects.adoc --output SOFTWARE_DISCLOSURE_DEFECTS.adoc
curl https://gitlab.com/fr8/omnibus/-/raw/prod/preview-src/corporate/document-retention-policy.adoc --output DOCUMENT_RETENTION.adoc
 