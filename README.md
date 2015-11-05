# Ember-cli-heyook-analytics

Analytics tools for Heyook projects.

### Set environment
```javascript
var ENV = {

  HeyookAnalytics: {
    googleAnalyticsId: "GOOGLE_ANALYTICS_ID",
    mixpanelToken: 'MIXPANEL_TOKEN',
    crazyEggId: "131/313"
  }

  //...
};
```

### Inline Content

Insert in to `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Add Mixpanel JS -->
    {{content-for 'mix-panel'}}

    <!-- Add Crazy Egg JS -->
    {{content-for 'crazy-egg'}}
  </head>
  <body>
    <!-- Add Google Analytics JS -->
    {{content-for 'google-analytics'}}
  </body>
</html>
```
