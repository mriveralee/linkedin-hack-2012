/**
 * Room.js
 * Room Model
 *
 *
 * @module  TDM
 * @class Room
 */

TDM.Room = Backbone.Model.extend({
    urlRoot: '/room',

    getRoomName: function() {
        return this.get('roomName');
    },

    getUsers: function() {
        return this.get('users');
    },

    getChatID: function() {
        return this.get('chatID');
    },

    getPlaylist: function() {
        return this.get('playlist');
    },

    getCurrentVideo: function() {
        return this.get('currentVideo');
    }

});