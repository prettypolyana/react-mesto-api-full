import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

class Main extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="content page__content">
          <section className="profile">
              <div className="profile__person">
                  <div className="profile__overlay" onClick={this.props.onEditAvatar}>
                      <img className="profile__avatar" alt="Фото профиля" src={this?.context?.avatar}/>
                  </div>
                  <div className="profile__info">
                      <div className="profile__title">
                          <h1 className="profile__name">{this?.context?.name}</h1>
                          <button className="profile__btn" type="button" onClick={this.props.onEditProfile}></button>
                      </div>
                      <p className="profile__subtitle">{this?.context?.about}</p>
                  </div>
              </div>
              <button className="profile__btn-plus" type="button" onClick={this.props.onAddPlace}></button>
          </section>
          <section className="elements content__elements">
              <ul className="elements__list">
                {this.props.cards.map((card) => (
                    <Card card={card} onCardClick={this.props.onCardClick} key={card._id} onCardLike={this.props.onCardLike} onCardDelete={this.props.onCardDelete}/>
                ))}
              </ul>
          </section>
      </main>
    );
  }
}

export default Main;
