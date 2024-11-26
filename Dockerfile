FROM nginx:alpine

WORKDIR /app

COPY . /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/nginx.template

EXPOSE 80

ENTRYPOINT ["/bin/sh", "-c", "envsubst '$$PROXY_1_LOCATION $$PROXY_1_URL' < /etc/nginx/conf.d/nginx.template > /etc/nginx/nginx.conf && cat /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
