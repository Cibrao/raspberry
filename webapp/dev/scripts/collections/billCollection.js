define( [
    'underscore',
    'backbone',
    '../models/billModel',
    'localstorage'
    ], function(_, Backbone, Bill) {
      var Bills = Backbone.Collection.extend({
        model: Bill,
        localStorage: new Backbone.LocalStorage("Bills")
      });

      return Bills;
    });
