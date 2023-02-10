import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import * as auth from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipOpen: false,
      isInfoTooltipSuccess: null,
      infoTooltipMessage: '',
      isLoginSuccess: null,
      selectedCard: null,
      currentUser: null,
      userEmail: '',
      cards: [],
    }
  }

  setSuccessRegisterInfoTooltipMessage = () => {
    this.setState({
      infoTooltipMessage: "Вы успешно зарегистрировались!",
    });
  }

  setErrorInfoTooltipMessage = () => {
    this.setState({
      infoTooltipMessage: "Что-то пошло не так! Попробуйте ещё раз.",
    });
  }

  tokenCheck = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.getMe(token)
        .then((res) => {
          if (res) {
            this.setState({
              userEmail: res.email,
            }, () => {
              this.setState({
                loggedIn: true,
              });
              this.loadUserAndCards();
              this.props.history.push('/');
            });
          }
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }

  loadUserAndCards = () => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
          this.setState({
            currentUser: userData,
            cards: cardsData.reverse(),
          });
      })
      .catch((err) => {
          console.log(err);
      });
  }

  componentDidMount = () => {
    this.tokenCheck();
  }

  handleEditAvatarClick = () => {
    this.setState({isEditAvatarPopupOpen: true});
  }

  handleEditProfileClick = () => {
    this.setState({isEditProfilePopupOpen: true});
  }

  handleAddPlaceClick = () => {
    this.setState({isAddPlacePopupOpen: true});
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipOpen: false,
      infoTooltipMessage: '',
      selectedCard: null,
    });
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card,
    });
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === this.state.currentUser._id);
    if (isLiked) {
      api.removeLike(card._id)
        .then((newCard) => {
          const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
          this.setState({
            cards: newCards,
          })
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
      api.addLike(card._id)
        .then((newCard) => {
          const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
          this.setState({
            cards: newCards,
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleCardDelete = (card) => {
    api.removeCard(card._id)
      .then(() => {
        const newCards = this.state.cards.filter((c) => c._id !== card._id);
        this.setState({
          cards: newCards,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUpdateUser = ({name, about}) => {
    api.setUserInfo(name, about)
      .then((userData) => {
        this.setState({
          currentUser: userData,
        });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUpdateAvatar = ({avatar}) => {
    api.setAvatar(avatar)
      .then((userData) => {
        this.setState({
          currentUser: userData,
        });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddPlaceSubmit = ({name, link}) => {
    api.addCard(name, link)
      .then((newCard) => {
        this.setState({
          cards: [newCard, ...this.state.cards],
        });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRegister = ({email, password}) => {
    auth.register(email, password)
      .then((res) => {
        this.setState({
          isInfoTooltipSuccess: true,
        }, () => {
          this.setSuccessRegisterInfoTooltipMessage();
          this.setState({
            isInfoTooltipOpen: true,
          });
          this.props.history.push('/sign-in');
        });
        return res;
      })
      .catch((err) => {
        this.setState({
          isInfoTooltipSuccess: false,
        }, () => {
          this.setErrorInfoTooltipMessage();
          this.setState({
            isInfoTooltipOpen: true,
          });
        });
        console.log(err);
      });
  }

  handleLogin = ({email, password}) => {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token){
          localStorage.setItem('jwt', res.token);
        }
        this.setState({
          isLoginSuccess: true,
        });
        console.log("here");
        return res;
      })
      .then((res) => {
          auth.getMe(res.token)
            .then((userData) => {
              this.setState({
                loggedIn: true,
              });
              this.setState({
                userEmail: userData.email,
              });
              // this.loadUserAndCards();
              // this.props.history.push('/');
              return userData;
            })
            .catch((err) => {
              console.log(err);
            });
      })
      .catch((err) => {
        this.setState({
          isLoginSuccess: false,
        }, () => {
          this.setErrorInfoTooltipMessage();
          this.setState({
            isInfoTooltipOpen: true,
          });
        });
        console.log(err);
      });
  }

  handleSignOut = () => {
    localStorage.removeItem('jwt');
    this.setState({
      loggedIn: false,
    }, () => {
      this.props.history.push('/sign-in');
    });
  }

  render() {
    return (
      <div className="page">
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header loggedIn={this.state.loggedIn} userEmail={this.state.userEmail} onSignOut={this.handleSignOut}/>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={this.state.loggedIn}
              component={Main}
              onEditAvatar={this.handleEditAvatarClick}
              onEditProfile={this.handleEditProfileClick}
              onAddPlace={this.handleAddPlaceClick}
              cards={this.state.cards}
              onCardClick={this.handleCardClick}
              onCardLike={this.handleCardLike}
              onCardDelete={this.handleCardDelete}
            />
            <Route path="/sign-in">
              <Login onLogin={this.handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={this.handleRegister} />
            </Route>
          </Switch>
          <Route exact path='/'>
            <Footer />
          </Route>
          <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser}/>
          <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit}/>
          <PopupWithForm name="delete-question" title="Вы уверены?" btnText="Да"/>
          <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar}/>
          <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}/>
          <InfoTooltip message={this.state.infoTooltipMessage} isOpen={this.state.isInfoTooltipOpen} isSuccess={this.state.isInfoTooltipSuccess} onClose={this.closeAllPopups}></InfoTooltip>
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
