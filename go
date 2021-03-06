#!/bin/bash

set -eu
normal_fg=$(tput sgr0)
debug_fg=$(tput setaf 9)

red_fg=$(tput setaf 1)

start_fg=$(tput setaf 5)
react_fg=$(tput setaf 93)
misc_fg=$(tput setaf 220)
checks_fg=$(tput setaf 189)
deploy_fg=$(tput setaf 135)
utils_fg=$(tput setaf 200)

function timestamp() {
  date+"%Y%m%d_%H%M%S"
}

function check_for_tool() {
  local toolName="${1}"
  local installInstructions="${2}"

  if ! which ${toolName} &>/dev/null ; then
    echo "${red_fg}${toolName}${utils_fg} not found${normal_fg}"
    echo "${utils_fg}Install with: ${red_fg}${installInstructions}${normal_fg}"
    exit 1
  fi
}

function check_for_tool_npm() {
  local toolName="${1}"
  local installInstructions="${2}"

  if ! npm list -g ${toolName} > /dev/null ; then
    echo "${red_fg}${toolName}${utils_fg} not found${normal_fg}"
    echo "${utils_fg}Install with: ${red_fg}${installInstructions}${normal_fg}"
    exit 1
  fi
}

function color(){
    for c; do
        printf '\e[48;5;%dm%03d ' $c $c
    done
    printf '\e[0m \n'
}

function task_color {
  # https://unix.stackexchange.com/a/269085
  IFS=$' \t\n'
  color {0..15}
  for ((i=0;i<6;i++)); do
      color $(seq $((i*36+16)) $((i*36+51)))
  done
  color {232..255}
}

function task_start {
  echo "${start_fg}Starting app${normal_fg}"
  yarn start
}

function task_clean {
  echo "${start_fg}Cleaning app${normal_fg}"
  echo -e "${start_fg}\tDeleting node modules${normal_fg}"
  rm -rf node_modules
  echo -e "${start_fg}\tReinstalling node modules${normal_fg}"
  yarn install
}

function task_build {
  echo "${deploy_fg}Building project${normal_fg}"
  yarn build
}

function task_deploy {
  prev_deploy="$(cat deploys)"
  new_deploy="$((prev_deploy + 1))"
  echo "$new_deploy" > "deploys"

  echo "${deploy_fg}Preparing deploy #${new_deploy} to firebase ${normal_fg}"
  task_build

  echo "${deploy_fg}Tagging in github${normal_fg}"
  git tag -a deploy_${new_deploy} -m "deploy ${new_deploy} to firebase"
  git push origin --tags

  echo "${deploy_fg}Deploying to firebase${normal_fg}"
  firebase deploy
}

function task_redeploy {
  prev_deploy="$(cat deploys)"

  echo "${deploy_fg}Preparing redeploy #${prev_deploy} to firebase ${normal_fg}"
  task_build

  echo "${deploy_fg}Deploying to firebase${normal_fg}"
  firebase deploy
}

function task_clear_port {
  local port=$(lsof -ti :3000)
  echo "${misc_fg}Finding and killing process running in port 3000 [${port}]${normal_fg}"

  kill -9 ${port}
}

function task_check_dep {
  check_for_tool "ncu" "npm install -g npm-check-updates"
  echo "${checks_fg}checking dependencies (do npm install to upgrade them)${normal_fg}"
  ncu -a
}

function task_help {
  help_message="usage: ./go"
  help_message+=" ${misc_fg}colors${normal_fg}"
  help_message+=" | ${misc_fg}clear_port${normal_fg}"

  help_message+=" | ${checks_fg}check_dep${normal_fg}"

  help_message+=" | ${start_fg}clean${normal_fg}"
  help_message+=" | ${start_fg}start${normal_fg}"

  help_message+=" | ${deploy_fg}build${normal_fg}"
  help_message+=" | ${deploy_fg}deploy${normal_fg}"
  help_message+=" | ${deploy_fg}redeploy${normal_fg}"
  echo "${help_message}"
}

function execute_task {
  local task="${1:-}"
  shift || true
  case ${task} in
    colors) task_color ;;
    clear_port) task_clear_port ;;

    check_dep) task_check_dep ;;

    clean) task_clean ;;
    start) task_start ;;

    build) task_build ;;
    deploy) task_deploy ;;
    redeploy) task_redeploy ;;
    *) task_help ;;
  esac
}

execute_task "$@"
