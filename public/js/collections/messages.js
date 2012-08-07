define(['jquery', 'backbone', 'models/message'], function($, Backbone, Message) {

  return Backbone.Collection.extend({

    defaults: {
      message: "You are now using Backbone, Lodash, Require, Modernizr, and jQuery! (Click Me)"
    },

    model: Message,

    // Model Constructor
    initialize: function() {

    },

    url: '/messages',

    // Any time a model attribute is set, this method is called
    validate: function(attrs) {

    }

  });

});