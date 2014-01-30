define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!../templates/mainApp.hbs'
    ], function($, _, Backbone, Handlebars, MainAppTemplate) {

      var MainApp = Backbone.View.extend({
    
        initialize: function() {
          _.bindAll(this, "render");
          console.log("initalize");
          this.render();
        },

        render: function() {
          this.$el.html(MainAppTemplate({}));
        }
      });

      var MainView = new MainApp({ el: $(".container") });
      return MainApp;
    });
    
