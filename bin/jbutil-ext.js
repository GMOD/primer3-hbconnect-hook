#!/usr/bin/env node

/*
    jbutil extension
*/

module.exports = {
    getOptions: function() {
        return [
            //['' , 'blah=PATH' , 'description of blah'],
        ];        
    },
    getHelpText: function() {
        return "";
        
    },
    process: function(opt,path,config) {
        //console.log("extended jbutil", opt,path);
        
        this.config = config;
        
        var blah = opt.options['blah'];
        if (blah) {
            // processing for blah
        }
    }
    
};

/**********************************************
 * process commands arguments - implementation
 **********************************************/

