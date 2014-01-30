define([
    "jquery",
    "underscore",
    "backbone",
    "handlebars",
    "hbs!../../../templates/music/yt/musicYt.hbs"
    ], function($, _, Backbone, Handlebars, MusicYtTmpl) {

      var MusicYt = Backbone.View.extend({
        
        initialize: function() {
          _.bindAll(this, "render");
          this.render();
        },

        render: function() {
          this.$el.html(MusicYtTmpl({}));
        }
      }); 

      var MusicYtView = new MusicYt({ el: $(".container") });
      return MusicYt;
    });
