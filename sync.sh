#!/bin/bash

echo $PEM_LOCATION 

if [ -z "$PEM_LOCATION" ]
then
      echo "\$PEM_LOCATION is empty. please set with your key like so 'export PEM_LOCATION=~/Documents/yourkey.pem"
else
      echo "\$PEM_LOCATION is set to $PEM_LOCATION. syncing..."
	  
	  #copy files to amazon
	  rsync -azvh --progress  -e "ssh -i $PEM_LOCATION" * ubuntu@adellematt.com:FacetrackingP5
	  
	  #copy files to public html dir
	  ssh -i ~/matt-intel-aws.pem ubuntu@adellematt.com  "sudo cp -r ~/FacetrackingP5/Raspy_ridge_2019_04_16_22_44_44/* /var/www/html/"
fi
 
