import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentList: [], nameInput: '', commentInput: ''}

  deleteComment = commentId => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentList = () => {
    const {commentList} = this.state

    return commentList.map(each => (
      <CommentItem
        key={each.id}
        commentDetails={each}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const IntialBackgroundColorClassName = `intial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      intialClassName: IntialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="bg-container">
        <h1>Comments</h1>
        <p>say Something about 4.0 Technologies</p>
        <form className="form-section" onSubmit={this.onAddComment}>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              onChange={this.onChangeName}
              value={nameInput}
            />
            <br />
            <textarea
              placeholder="Your Comment"
              rows="10"
              cols="45"
              onChange={this.onChangeComment}
              value={commentInput}
            />
            <div>
              <button type="submit" className="button">
                Add Comment
              </button>
            </div>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image"
          />
        </form>
        <hr />
        <p className="heading">
          <span className="comments-count">{commentList.length}</span> Comments
        </p>
        <ul className="comments-list">{this.renderCommentList()}</ul>
      </div>
    )
  }
}
export default Comments
