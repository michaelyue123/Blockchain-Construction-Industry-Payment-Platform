import React from 'react'
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    // const navigate = useNavigate();
    const user = useSelector(state => state.authentication.user)

    return (
        <Route {...rest} render={props => {
            let loginUser = {user};
            
            console.log(loginUser);

            if (loginUser){
                return <Component {...props} />
            }else{
                return <Link to={{ pathname: '/login', state: { from: props.location } }} />
            }
        }} />
    );
}

export default ProtectedRoute;