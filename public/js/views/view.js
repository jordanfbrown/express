define(['jquery', 'backbone', 'collections/messages', 'text!templates/main.html'], function($, Backbone, Messages, template) {

  return Backbone.View.extend({
    // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
    el: '#root',

    history: [],
    
    historyPointer: 0,

    // View constructor
    initialize: function(options) {
      this.template = _.template(template);

      var that = this;
      this.messages = new Messages();
      this.messages.on('reset', function(messages) {
        messages.each(function(message) {
          that.renderMessage(message.toJSON());
        })
      });

      this.socket = options.socket;
      this.socket.on('server.message', _.bind(function(message) {
        this.renderMessage(message);
      }, this));

      this.messages.fetch();
    },

    renderMessage: function(message) {
      var html = '<p>(' + this.formatDate(message.date) + ') ' + message.message + '</p>';
      this.$el.find('#chat-window').append(html);
    }                                            ,

    events: {
      'click #send': 'sendMessage',
      'keyup #message': 'handleKeyup'
    },
    
    handleKeyup: function(e) {
      e.preventDefault();
      if(e.which === 13) {
        this.sendMessage();
      }
      else if(e.which === 38) {
        if(this.history.length > 0 && this.historyPointer >= 0) {
          var message = this.history[this.historyPointer--];
          this.setMessageText(message);
        }
        else {
          this.setMessageText('');
        }
      }
      else if(e.which === 40) {
        if(this.history.length > 0 && this.historyPointer <= this.history.length - 1) {
          var message = this.history[this.historyPointer++];
          this.setMessageText(message);
        }
        else {
          this.setMessageText('');
        }
      }
    },

    setMessageText: function(text) {
      this.$el.find('#message').val(text);
    },

    sendMessage: function() {
      var $message = this.$el.find('#message');
      var message = $message.val();
      $message.val('');
      this.history.push(message);
      this.historyPointer = this.history.length - 1;
      this.socket.emit('client.message', {date: new Date(), message: message});
    },

    formatDate: function(date) {
      var newDate = new Date(date);
      return newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    },

    render: function() {
      this.$el.append(this.template);
    }

  });
});