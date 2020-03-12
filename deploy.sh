#!/bin/sh
npm run ci
zip -q -r video-platform-back-end.zip * -x "node_modules/*" -x "coverage/*" -x "logs/*" -x "run/*" 
