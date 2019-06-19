#!/bin/sh
echo 'instalando';
echo '>> back-end <<';
cd back-end/
/usr/bin/npm i
/usr/bin/npm audit fix
cd ..
echo '>> front-end <<';
cd front-end/
/usr/bin/npm i
/usr/bin/npm audit fix
cd ..
