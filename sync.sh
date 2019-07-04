#!/bin/bash

echo $PEM_LOCATION 

if [ -z "$PEM_LOCATION" ]
then
      echo "\$PEM_LOCATION is empty. please set with your key like so 'export PEM_LOCATION=~/Documents/yourkey.pem"
else
      echo "\$PEM_LOCATION is set to $PEM_LOCATION. syncing..."
	  rsync -azvh --progress  -e "ssh -i $PEM_LOCATION" * ubuntu@adellematt.com:FacetrackingP5
fi
 
#git pull main master
#rsync -azvh --progress  -e "ssh -i $PEM_LOCATION" * ubuntu@adellematt.com:FacetrackingP5
#rsync -azvh --progress  -e "ssh -i ~/matt-intel-aws.pem" * ubuntu@54.200.109.247:FacetrackingP5

#scp -r  -i "~/matt-intel-aws.pem" * ubuntu@54.191.170.5:FacetrackingP5
