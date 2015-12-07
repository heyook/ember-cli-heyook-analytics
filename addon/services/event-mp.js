import Ember from 'ember';

export default Ember.Service.extend({
  track: function(...args) {
    mixpanel.track(...args);
  },

  time_event: function(...args) {
    mixpanel.time_event(...args);
  }
});
