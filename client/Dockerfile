FROM node:19.4-bullseye AS build
WORKDIR /app
COPY package.json /app
#RUN --mount=type=cache,target=/usr/src/app/.npm \
#  npm set cache /usr/src/app/.npm && \
#  npm install
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:alpine
#-------------------------------------------
WORKDIR /usr/local/bin

COPY --from=build /app/build /usr/share/nginx/html

#COPY generate-config.sh .

#COPY custom-nginx.template /etc/nginx/conf.d/
#-------------------------------------------
EXPOSE 8080