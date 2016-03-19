var CommentList = React.createClass({
  componentDidMount: function () {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this._onChange);
  },

  render: function () {
    console.log('rendering CommentList!');
    return (
      <div>
        {Store.comments().map(function (comment) {
          return <Comment key={comment.id} {... comment} />
        })}
      </div>
    );
  },
  _onChange: function () {
    this.forceUpdate();
  }
});
