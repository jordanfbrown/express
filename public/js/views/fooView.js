define(['jquery', 'backbone'], function($, Backbone) {

  var FooView = Backbone.View.extend({

    el: 'body',

    // View constructor
    initialize: function() {

    },

    events: {

    },

    render: function() {
      this.$el.html('<p>foo</p>');
      return this;
    }
  });

  return FooView;
});