define(['jquery', 'backbone', 'views/view'], function($, Backbone, MainView) {

  return Backbone.Router.extend({
    socket: false,
    
    initialize: function() {
      Backbone.history.start();
    },

    routes: {
      '': 'main'
    },
    
    getSocket: function() {
      return this.socket = this.socket || io.connect('127.0.0.1:3001');
    },

    main: function() {
      var socket = this.getSocket();
      var view = new MainView({socket: socket}).render();
    }
  });

});