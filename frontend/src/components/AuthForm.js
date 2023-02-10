import React from 'react';

function AuthForm({name, title, children, onSubmit}) {
    return (
        <div className="auth__container">
            <form className="auth__content" name={name} onSubmit={onSubmit}>
                <h1 className="auth__title">{title}</h1>
                {children}
            </form>
        </div>
    );
}

export default AuthForm;
