import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

class Card extends React.Component {
  static contextType = CurrentUserContext;

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  }

  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  }

  render() {
    const isOwn = this.props.card.owner._id === this.context._id;

    const cardDeleteButtonClassName = (
      `elements__trash ${isOwn ? 'elements__trash_shown' : ''}`
    );

    const isLiked = this.props.card.likes.some(i => i._id === this.context._id);

    const cardLikeButtonClassName = (
      `elements__btn ${isLiked ? 'elements__btn_active' : ''}`
    ); 

    return (
        <li className="elements__card">
            <img className="elements__photo" src={this.props.card.link} alt={this.props.card.name} onClick={this.handleClick}/>
            <button className={cardDeleteButtonClassName} onClick={this.handleDeleteClick}></button>
            <div className="elements__info">
                <h2 className="elements__name">{this.props.card.name}</h2>
                <div className="elements__likes">
                    <button className={cardLikeButtonClassName} type="button" onClick={this.handleLikeClick}></button>
                    <p className="elements__counter">{this.props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
  }
}

export default Card;