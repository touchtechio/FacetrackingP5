
sudo docker pull nginx
cd ~/FacetrackingP5/Raspy_ridge_2019_04_16_22_44_44/
chmod o+x .
sudo docker run --name docker-nginx -p 5000:80 -d -v ~/FacetrackingP5/Raspy_ridge_2019_04_16_22_44_44:/usr/share/nginx/html nginx
