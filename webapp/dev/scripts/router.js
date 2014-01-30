define([
    "jquery",
    "underscore",
    "backbone"
    ], function($, _, Backbone) {
      
      var AppRouter = Backbone.Router.extend({
        register: function(route, name, path) { //address, name of function to invoke, path to view

          this.route(route, name, function() {
    
            require([path], function(Module) {
              module = new Module();
              module.initialize();
            });
          });
        }
      });

      return { initialize: function() {
          var router = new AppRouter();

          router.register("*actions", "mainApp", "views/mainApp");
          router.register("spendings", "spendingsView", "views/spendings/spendingsView");
          router.register("musicMenu", "musicMenuView", "views/music/musicMenuView");
          router.register("youtube", "musicYtView", "views/music/yt/musicYtView");
//          router.register("radio", "radioView", "views/music/radio/radioView");

          Backbone.history.start();
        }
      };
    });
