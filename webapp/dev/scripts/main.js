require.config({
  paths: {
    "jquery": "vendor/jquery/jquery",
    "underscore": "vendor/underscore-amd/underscore",
    "backbone": "vendor/backbone-amd/backbone",
    "hbs": "vendor/requirejs-handlebars/hb",
    "handlebars": "vendor/handlebars/handlebars",
    "text": "vendor/requirejs-text/text",
    "bootstrap": "vendor/bootstrap/dist/js/bootstrap",
    "localstorage": "vendor/backbone.localStorage/backbone.localStorage"
  },
  shim: {
    "handlebars": {
      exports: "Handlebars",
    },
  }
});

require(["router"], function(Router) {
  console.log(Router);
  Router.initialize();
});
