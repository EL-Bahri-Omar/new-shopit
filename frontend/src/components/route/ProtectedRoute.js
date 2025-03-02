import React, { Fragment } from 'react'
import { Route, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
const ProtectedRoute = ({ component: Component, ...rest }) => {
    
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    if (loading) return null; // Prevent redirection while loading
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

    return (        
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Navigate to='/login'/>
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
  )
}

export default ProtectedRoute
