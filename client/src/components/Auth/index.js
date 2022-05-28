import React from 'react';

export const Auth = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Todo-list</h1>
                <div className="card light-blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">
                            Авторизация
                        </span>
                        <div className="input-field">
                            <input
                                id="email"
                                type="text"
                                name="email"
                                className={"yellow-input"}
                            />
                            <label htmlFor="email">
                                Email
                            </label>
                        </div>
                        <div className="input-field">
                            <input
                                id="username"
                                type="text"
                                name="username"
                                className={"yellow-input"}
                            />
                            <label htmlFor="username">
                                Username
                            </label>
                        </div>
                        <div className="input-field">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className={"yellow-input"}
                            />
                            <label htmlFor="password">
                                Пароль
                            </label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={"btn green lighten-2"}
                            style={{marginRight: 10}}
                        >
                            Войти
                        </button>
                        <button
                            className={"btn  orange"}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}