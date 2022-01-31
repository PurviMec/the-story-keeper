import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  

  // clear form values
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...formState }
      });
      Auth.login(data.login.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input name="email" type="email" id="email" className="form-control" placeholder="Your email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="password" placeholder="******"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <button className="btn d-block w-100 btn-primary" type="submit">Submit</button>
            </form>
            {error && <div>Login failed</div>}
            {/* <form onSubmit={handleFormSubmit}>
              <input
                className="form-input m-4"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input m-4"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100 btn-primary" type="submit">
                Submit
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;