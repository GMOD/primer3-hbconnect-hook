var approot = require("app-root-path").path;
var shell = require("shelljs");
var modPath = ""+shell.pwd();
var fs = require("fs-extra");
var async = require("async");


console.log(">>> demo-jbconnect-hook postinstall");
console.log("appPath",approot,"modPath",modPath);

//exit if modPath == approot, don't need to copy anything.
if (modPath === approot)
    process.exit(0);
    

// list of directories to copy
var dirList = [
    {src:'workflows',trg:'workflows'}
];

async.each(dirList,
    function(item, cb){
        var trg = approot+"/"+item.src;
        var src = modPath+"/"+item.trg;

        console.log('copying ',src,trg);
        // delete the old dir from src dir and make a current copy
        fs.copy(src, trg,{overwrite:true})
        .then(function() {
            //console.log("copied",trg);
            cb();
        })
        .catch(function(err) {
            console.log("error",err);
            cb(err);
        });

    },
    // done copying all directories
    function(err){
        if (err) {
            console.log("error",err);
            return;
        }
        console.log("postinstall done");
    }
);

// currently, we assume jbrowse has already been installed as a module in the 
// TODO: needs better handling (ie. in case JBrowse is installed elsewhere).

// copy plugin dependencies to assets/jblib
console.log("Copying plugin dependencies to assets/jblib...");
let targDir = approot+'/assets/jblib';
fs.ensureDirSync(targDir);

// slider-pips
//fs.copySync(approot+'/node_modules/jQuery-ui-Slider-Pips/dist',targDir,{overwrite:true});

// add jblast tests to jbconnect/package.json

// console.log("Modifying package.json in approot...");
// let package = require(approot+'/package.json');
// package.scripts['jblast-test'] = "mocha test/unit/**/*.test.js test/integration/**/*.test.js node_modules/jblast-jbconnect-hook/test/jblast-int/**/*.test.js test/bootstrap/bootstrap.test.js";
// fs.writeFileSync(approot+'/package.json', JSON.stringify(package,null,2));

