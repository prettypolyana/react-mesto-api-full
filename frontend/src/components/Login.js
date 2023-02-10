import React, {useState} from 'react';
import AuthForm from './AuthForm';

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({email, password});
  }
  
  return (
    <AuthForm name="login-form" title="Вход" onSubmit={handleSubmit}>
      <fieldset className="auth__input-field">
        <input 
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span id="email-error" className="auth__input-error"></span>
      </fieldset>

      <fieldset className="auth__input-field">
        <input 
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="40"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <span id="password-error" className="auth__input-error"></span>
      </fieldset>
      <button className="auth__btn" type="submit">Войти</button>
    </AuthForm>
  );
}

export default Login;
