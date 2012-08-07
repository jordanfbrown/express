define(['jquery', 'backbone', 'models/model', 'text!templates/main.html'], function($, Backbone, Model, template) {

  return Backbone.View.extend({
    // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
    el: '#root',

    // View constructor
    initialize: function(options) {
      this.template = _.template(template);
      this.socket = options.socket;
      this.socket.on('server.message', _.bind(function(data) {
        var html = '<p>' + data.date + ' ' + data.message + '</p>';
        this.$el.find('#chat-window').append(html);
      }, this));
    },

    events: {
      'click input[type=submit]': 'sendMessage'
    },
    
    sendMessage: function() {
      var $input = this.$el.find('input[type=text]');
      var message = $input.val();
      $input.val('');
      this.socket.emit('client.message', {date: new Date(), message: message});
    },

    render: function() {
      this.$el.append(this.template);
    }

  });
});