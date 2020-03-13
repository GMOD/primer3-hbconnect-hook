/*
 * @module demo-jbconnect-hook
 * @description
 * This module is the main subclass of a Sails Hook incorporating *Marlinspike*.
 */
'use strict';


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

//var _marlinspike = require('./marlinspike');
var _marlinspike = require('marlinspike');

var _marlinspike2 = _interopRequireDefault(_marlinspike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var thisHook;

if (typeof sails !== 'undefined')
    thisHook = sails.hooks.jblast;
else
    thisHook = global.jtest_hook;   // this handles hbh-jblast npm test case.  It's a bit hackish

if (!thisHook) {
  var Hook = function (_Marlinspike) {
    _inherits(Hook, _Marlinspike);

    function Hook(sails) {
      _classCallCheck(this, Hook);

      return _possibleConstructorReturn(this, (Hook.__proto__ || Object.getPrototypeOf(Hook)).call(this, sails, module));
    }

    _createClass(Hook, [{
      key: 'defaults',
      value: function defaults(overrides) {
        // http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification/defaults#?using-defaults-as-a-function
      }
    }, {
      key: 'configure',
      value: function configure() {
        // this.sails = sails
        // http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification/configure
        const fs = require('fs-extra');
        let services = sails.config.globals.jbrowse.services;

        sails.log.debug('>> jblast hookPath: ',this.hookPath);
        let hookPath = this.hookPath.replace('api/hooks/jblast','')+'api/services';

        // add .path and .module to service config for jblast services (this is sort of a hack)
        // todo: cleanup hack
        fs.readdir(hookPath, function(err, items) {
          //console.log('dir',items);
          for(let i in items) {
            if (items[i].indexOf('Service.js') > 0) {
              let servName = items[i].split('.js')[0];
              if (!services[servName]) continue;
              sails.log.info('JBlast service - '+servName);
              services[servName].path = hookPath+'/'+servName;
              services[servName].module = 'jblast';
            }
          }
          //sails.services.jblastPostAction = require(hookPath+'/jblastPostAction');
          //sails.log.debug('>> jblast services: ',services);
        });        
      }
    }, {
      key: 'initialize',
      value: function initialize(next) {
        // http://sailsjs.org/documentation/concepts/extending-sails/hooks/hook-specification/initialize
        
        sails.on('hook:orm:loaded', function() {

              // do something after hooks are loaded
              return next();
          });
  
      }
    }, {
      key: 'routes',
      value: function routes() {
      }
    }]);

    return Hook;
  }(_marlinspike2.default);

  thisHook = _marlinspike2.default.createSailsHook(Hook);
}

exports.default = thisHook;
module.exports = exports['default'];

