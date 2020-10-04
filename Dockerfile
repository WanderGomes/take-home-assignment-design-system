FROM httpd:2.4

COPY httpd-config/httpd.conf /usr/local/apache2/conf.d/httpd.conf

WORKDIR /usr/local/apache2/htdocs
