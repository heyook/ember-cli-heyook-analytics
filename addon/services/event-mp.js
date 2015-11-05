import Ember from 'ember';

export default Ember.Service.extend({
  track: function(argument) {
    mixpanel.track(argument);
  },

  time_event: function(argument) {
    mixpanel.time_event(argument);
  }
});
