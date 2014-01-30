define([
    "jquery",
    "underscore",
    "backbone",
    "handlebars",
    "hbs!../../templates/music/musicMenu.hbs"
    ], function($, _, Backbone, Handlebars, MusicMenuTmpl) { 
      var MusicMenu = Backbone.View.extend({

        initialize: function() {
          _.bindAll(this, "render");
          console.log("initialize");
          this.render();
        },

        render: function() {
          this.$el.html(MusicMenuTmpl({}));
          $(".navbar-fixed-bottom").hide();
        }

      });

      var MusicMenuView = new MusicMenu({ el: $(".container") });
      return MusicMenu;
    });
