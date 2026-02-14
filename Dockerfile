FROM node:22-alpine

WORKDIR /app

CMD trap "exit 0;" TERM INT; sleep 99999999999d & wait
