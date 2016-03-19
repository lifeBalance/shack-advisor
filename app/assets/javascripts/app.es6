const Constants = {
  CHANGE_EVENT: 'change',
  ADD_COMMENT: 'comments.add'
};

// The Store
// var Store = new _.extend({}, EventEmitter.prototype, {
class Store extends EventEmitter {
  constructor() {
    super()
    this._comments = []
  }

  addComment(comment) {
    this._comments[comment.id] = comment;
  }

  comments() {
    return this._comments;
  }

  addChangeListener(cb) {
    this.on(Constants.CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.remove(Constants.CHANGE_EVENT, cb);
  }

  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  }
}

let commentStore = new Store()

// The Dispatcher
var AppDispatcher = new Flux.Dispatcher();

AppDispatcher.register((payload) => {
  switch (payload.actionType) {
    case Constants.ADD_COMMENT:
      commentStore.addComment(payload.comment)
      commentStore.emitChange()
      console.log('Dispatched addComment!!')
      break
    default:
      // No-op
  }
});

// Actions
class Actions {
  addComment (params) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_COMMENT,
      comment: params
    })
  }
}

let commentActions = new Actions()
