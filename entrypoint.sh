#!/bin/sh

set +e
npx tsc -p .
npx sequelize-cli db:migrate
npm run start