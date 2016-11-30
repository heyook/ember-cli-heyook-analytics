/* jshint node: true */
'use strict';

var path = require('path');
function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
};

/*
  Google Analytics JS
*/
var gaContent = hereDoc(function() {/*!
  <script type='text/javascript'>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', '{{GOOGLE_ANALYTICS_ID}}', 'auto');
  </script>
*/});

/*
  Mixpanel JS
*/
var mpContent = hereDoc(function() {/*!
  <script type='text/javascript'>
    (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
    for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
    mixpanel.init('{{MIXPANEL_TOKEN}}');
  </script>
*/});

/*
  Crazy Egg JS
*/
var ceContent = hereDoc(function() {/*!
  <script type="text/javascript">
    setTimeout(function(){var a=document.createElement("script");
    var b=document.getElementsByTagName("script")[0];
    a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/{{CRAZYEGG_ID}}.js?"+Math.floor(new Date().getTime()/3600000);
    a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
  </script>
*/});

/*
  Hotjar JS
*/
var hjContent = hereDoc(function() {/*!
  <script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:{{HOTJAR_ID}},hjsv:5};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
  </script>
*/});

module.exports = {
  name: 'ember-cli-heyook-analytics',

  included: function(app, parentAddon) {
    this._super.included(app);

    var target = (parentAddon || app);
    var projectConfigPath = target.options.project.root + "/config/environment";
    var configPath = (target.options.configPath || projectConfigPath);
    var config = require(configPath)(target.env).HeyookAnalytics;

    target.options.inlineContent = {
      'google-analytics' : {
        content: gaContent,
        postProcess: function(content) {
          return content.replace(/\{\{GOOGLE_ANALYTICS_ID\}\}/g, config.googleAnalyticsId);
        }
      },
      'mix-panel' : {
        content: mpContent,
        postProcess: function(content) {
          return content.replace(/\{\{MIXPANEL_TOKEN\}\}/g, config.mixpanelToken);
        }
      },
      'crazy-egg' : {
        content: ceContent,
        postProcess: function(content) {
          return content.replace(/\{\{CRAZYEGG_ID\}\}/g, config.crazyEggId);
        }
      },
      'hot-jar' : {
        content: hjContent,
        postProcess: function(content) {
          return content.replace(/\{\{HOTJAR_ID\}\}/g, config.hotjarId);
        }
      }
    };
  }
};
