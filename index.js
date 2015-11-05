/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-heyook-analytics',

  included: function(app, parentAddon) {
    this._super.included(app);

    var target = (parentAddon || app);
    var config = require(app.options.configPath)(app.env).HeyookAnalytics;
  
    target.options.inlineContent = {
      'google-analytics' : {
        file: './ga.js',
        postProcess: function(content) {
          return content.replace(/\{\{GOOGLE_ANALYTICS_ID\}\}/g, config.googleAnalyticsId);
        }
      },
      'mix-panel' : {
        file: './mp.js',
        postProcess: function(content) {
          return content.replace(/\{\{MIXPANEL_TOKEN\}\}/g, config.mixpanelToken);
        }
      }
    };
  }
};
