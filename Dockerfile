FROM nginx
MAINTAINER homewin
VOLUME /iview
ADD dist/ /usr/share/nginx/html
ADD nginx.conf /etc/nginx/nginx.conf
