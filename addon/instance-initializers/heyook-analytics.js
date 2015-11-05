import Ember from "ember";

export function initialize(instance) {
  var config = instance.container.lookupFactory('config:environment');
  var googleAnalyticsId = (config.HeyookAnalytics || {}).googleAnalyticsId;
  var mixpanelToken = (config.HeyookAnalytics || {}).mixpanelToken;

  if (Ember.isNone(mixpanelToken)) {
    throw [
      "Your MixPanel token must be set."
    ].join('\n');
  }

  if (Ember.isNone(googleAnalyticsId)) {
    throw [
      "Your Google Analytics ID must be set."
    ].join('\n');
  }

  var service = instance.container.lookup('service:heyookAnalytics');
  service.set('googleAnalyticsId', googleAnalyticsId);
  service.set('mixpanelToken', mixpanelToken);
}

export default {
  name: 'heyook-analytics',
  initialize: initialize
};
