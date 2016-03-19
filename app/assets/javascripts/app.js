var Constants = {
  CHANGE_EVENT: 'change',
  ADD_COMMENT: 'comments.add'
};

var Store = new _.extend({}, EventEmitter.prototype, {
  _comments: [],
  addComment: function (comment) {
    this._comments[comment.id] = comment;
  },

  comments: function () {
    return _comments;
  },

  addChangeListener: function (cb) {
    this.on(Constants.CHANGE_EVENT, cb);
  },

  removeChangeListener: function (cb) {
    this.remove(Constants.CHANGE_EVENT, cb);
  },

  emitChange: function () {
    this.emit(Constants.CHANGE_EVENT);
  }
});

var AppDispatcher = new FluxDispatcher();

AppDispatcher.register(function (payload) {
  var action = payload.actionType;
  switch (action) {
    case Constants.ADD_COMMENT:
      Store.addComment(payload.comment)
      break;
    default:
      // No-op
  }
});
