FROM nginx:1.9.9
ADD build /usr/share/nginx/html
ADD nginx.conf /etc/nginx
EXPOSE 80