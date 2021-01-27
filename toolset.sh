#!/bin/bash -xe

function paramsError() {
  echo "Choose one of the options";
  echo " - bash -- login to bash container"
  echo " - test -- run the tests from docker container"
  exit
}

if [ -z "$1" ]
then
  paramsError
fi

case "$1" in 
  bash)
    # start an interactive bash inside the container
    # the -l at the end stands for login shell that reads profile files (read man)
    docker exec -it node-express-ts bash -l
    ;;
  test)
    # executes the tests from docker container 
    docker exec -it node-express-ts bash -c "PORT=4001 yarn test"
    ;;
  *)
    paramsError
    ;;
esac
