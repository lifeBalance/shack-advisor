var Constants = {
  CHANGE_EVENT: 'change',
  ADD_COMMENT: 'comments.add'
};

// The Store
var Store = new _.extend({}, EventEmitter.prototype, {
  _comments: [],

  addComment: function (comment) {
    this._comments[comment.id] = comment;
  },

  comments: function () {
    return this._comments;
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

// The Dispatcher
var AppDispatcher = new Flux.Dispatcher();

AppDispatcher.register(function (payload) {
  var action = payload.actionType;
  switch (action) {
    case Constants.ADD_COMMENT:
      Store.addComment(payload.comment)
      Store.emitChange();
      console.log('Dispatched addComment!!');
      break;
    default:
      // No-op
  }
});

// Actions
var Actions = new _.extend({},{
  addComment: function (params) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_COMMENT,
      comment: params
    });
  }
});
