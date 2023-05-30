#!/bin/bash

# set -e
set -uxoe pipefail

on_exit () {
  echo "This script has exited in error"
}

trap on_exit ERR

while getopts o:r:b:i:t: flag
do
    case "${flag}" in
        o) organization=${OPTARG};;
        r) repository=${OPTARG};;
        b) branch=${OPTARG};;
        i) image_repository=${OPTARG};;
        t) image_tag=${OPTARG};;
        # \?) echo "Error: Invalid option" && false; exit;
    esac
done

if [[ (( -z "$organization" ) || ( -z "$repository") || ( -z "$branch") || ( -z "$image_tag") || ( -z "$image_repository")) ]]
then
  echo 'Error: Some of the required options are missing'; false;
  exit;
fi

# variables
# organization="beyondclicksai"
# repository="helm-service-user"
# branch="development"
# image_tag="hehe-1"
# image_repository="service-user"

# CONTENT FROM A BRANCH
# CONTENT=$(curl --silent -H  "Authorization: Bearer ${GH_TOKEN}" "https://api.github.com/repos/${organization}/${repository}/contents/${branch}_values.yaml?ref=${branch}")

# CONTENT FROM DEFAULT BRANCH
CONTENT=$(curl --silent -H  "Authorization: Bearer ${GH_TOKEN}" "https://api.github.com/repos/${organization}/${repository}/contents/${branch}_values.yaml")
if [ "$( jq 'has("content")' <<< $CONTENT )" == "true" ];
then
  sha=$( jq '.sha' -r <<< $CONTENT )
  # echo "$( jq '.content' -r <<< $CONTENT )" | base64 -d | yq '.image.tag = "'${tag}'"' | base64
  modified_content=$( jq '.content' -r <<< $CONTENT | base64 -d | yq '(.image.tag = "'${image_tag}'"),(.image.repository = "'${image_repository}'")' | base64 -w 0 )
  PAYLOAD='{ "message": "build(%s): release version %s [skip ci]", "sha": "%s", "branch": "%s", "content": "%s" }'
  echo [GITHUB] Updating SHA ${sha}: ${organization}/${repository}/contents/${branch}_values.yaml;
  UPDATE=$(curl \
    --silent \
    -X PUT \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GH_TOKEN}" \
    "https://api.github.com/repos/${organization}/${repository}/contents/${branch}_values.yaml" \
    -d "$(printf "$PAYLOAD" "$repository" "$image_tag" "$sha" "$branch" "$modified_content")");

  if [ "$( jq 'has("content")' <<< $UPDATE )" == "true" ];
  then
    echo [GITHUB] Updated SHA $(jq '.content.sha' -r <<< $UPDATE): ${organization}/${repository}/contents/${branch}_values.yaml;
    true;
    exit;
  else
    false;
    exit;
  fi
else
  echo "Error: Content is invalid" $CONTENT; false;
  exit;
fi
