#!/usr/bin/env bash

set -e
set -u
set -o pipefail

yarn ganache:start -- -b 2 >> /dev/null 2>&1 &
ganache_start_pid=$!
sleep 5

pushd "$(mktemp -d)"
yarn install --no-lockfile truffle
truffle="$(npm bin)/truffle"
$truffle unbox drizzle
echo "Deploying contracts for Drizzle test..."
$truffle compile
$truffle migrate

BROWSER=none yarn start >> /dev/null 2>&1 &
start_pid=$!

popd
if ! mocha test/e2e/drizzle.spec
then
    test_status=1
fi

! kill -15 $ganache_start_pid
! kill -15 $start_pid
! wait $ganache_start_pid $start_pid
exit ${test_status:-}
