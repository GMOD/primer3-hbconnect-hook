# primer3-jbconnect-hook

### Pre-Install
Primer3 JBConnect Hook requires [redis](http://redis.io "http://redis.io") as a pre-requisite, which is only used by the queue framework ([kue](https://www.npmjs.com/package/kue "https://www.npmjs.com/package/kue")). JBConnect depends on [SailsJS](http://sailsjs.com "http://sailsjs.com").

Install redis and sails

```
yum install redis
redis-server
npm install -g sails@1.0.2
```
### Install
Install the JBConnect and JBrowse. jb_setup.js ensures the sample data is loaded.
```
# install jbconnect
git clone http://github.com/gmod/jbconnect
cd jbconnect
npm install

# install demo-jbconnect-hook
npm install gmod/primer3-jbconnect-hook

# install jbrowse & setup jbrowse demo
npm install @gmod/jbrowse@1.15.1
patch node_modules/@gmod/jbrowse/setup.sh fix_jbrowse_setup.patch
./utils/jb_setup.js
```
The patch operation is needed to make JBrowse 1.15.1 setup.sh run properly. If JBrowse is installed in another location, the patch should be run before setup.sh.

### Install Primer3
```
git clone https://github.com/primer3-org/primer3.git primer3
cd primer3/src
make
```

### Run
Launch the server.
```
sails lift
```
From a web browser, access the application (default login: juser/password).
```
http://localhost:1337/jbrowse
```
