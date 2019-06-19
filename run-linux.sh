#!/bin/sh
echo 'iniciado la aplicacion';
cd back-end/
/usr/bin/npm start & date;
cd ..
cd front-end/
/usr/bin/npm start
