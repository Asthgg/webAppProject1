FROM node:9.6.1

LABEL version="1.0"
LABEL description="Opinorion"
LABEL maintainer="Andrea González - agonza84@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /WebAppProject1
COPY . ./

RUN npm install --test

EXPOSE 3000
CMD npm start