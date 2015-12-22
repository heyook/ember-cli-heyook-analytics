import EventMP from '../services/event-mp';

export function initialize(application) {
  var eventMP = EventMP.create();

  application.register('event-mp:current', eventMP, {
    instantiate: false
  });

  application.inject('controller', 'EventMP', 'event-mp:current');
  application.inject('route', 'EventMP', 'event-mp:current');
}

export default {
  name: 'event-mp',
  initialize: initialize
};
