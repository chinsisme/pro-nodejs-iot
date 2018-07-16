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
npm install
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