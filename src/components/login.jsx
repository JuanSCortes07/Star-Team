import React, {useState} from 'react';

const Login = (props) =>{

    const initialStateValues = {
        email:'',
        password:''
    }

    const [values, setValues] = useState(initialStateValues);

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.loginApp(values);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})   
    };


    return(
        <div className="text-center mt-4">
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src="like.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" name="email" placeholder="Email address" onChange={handleInputChange} required autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" name="password" placeholder="Password" onChange={handleInputChange} required/>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2021</p>
            </form>
        </div>
            );
}

export default Login;