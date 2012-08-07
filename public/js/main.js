require.config({
  paths: {
    modernizr: 'libs/modernizr-2.5.3',
    jquery: 'libs/jquery-1.7.2',
    underscore: 'libs/lodash-0.3.1',
    backbone: 'libs/backbone-0.9.2',
    text: 'plugins/text-2.0.0',
    socket: 'libs/socket.io'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['modernizr', 'jquery', 'backbone', 'routers/router', 'socket'], function(Modernizr, $, Backbone, Router, Socket) {
  this.router = new Router();
});