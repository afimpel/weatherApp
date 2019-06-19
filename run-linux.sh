#!/bin/sh
echo 'iniciado la aplicacion';
echo ">> back-end: 3001 <<";
cd back-end/
/usr/bin/npm start & date;
cd ..
echo ">> front-end: 3000 <<";
cd front-end/
/usr/bin/npm start
