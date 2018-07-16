# Setting up a NodeJS server for serving devices
## Pre-requisites
### Insall NVM, Node, and NPM
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install node 10.6.0
```

```
git clone https://github.com/chinsisme/pro-nodejs-iot.git
git checkout dev
```

```
sudo apt-get update
sudo apt-get install build-essential
npm install
```

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org=4.0.0 mongodb-org-server=4.0.0 mongodb-org-shell=4.0.0 mongodb-org-mongos=4.0.0 mongodb-org-tools=4.0.0
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

## Set up environment variables

```
export port=3001 //Or anything else
export my_iot_jwtPrivateKey=? 
```

## Versions
```
nvm = 0.33.0
node = v10.6.0
npm = 6.1.0
```