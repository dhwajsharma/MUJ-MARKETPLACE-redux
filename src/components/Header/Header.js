import { Button } from '@mui/material';
import React from 'react'
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { auth, provider } from '../../firebase'
import { login, logout, selectUser } from '../../features/userSlice';
import { useHistory } from 'react-router'

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(({ user }) => {
                dispatch(login({
                    displayName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoUrl
                }))
            })
            .catch(error => alert(error.message))
    }

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    }

    return (
        <div className="header">
            <div className="header__left" onClick={() => history.push("/")} >
                <h2>MARKETPLACE</h2>
            </div >
            <div className="header__right">
                {!user ? (
                    <Button variant="contained" color="primary" onClick={signIn}>Login</Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={signOut}>Logout</Button>
                )
                }
            </div>
        </div >
    )
}

export default Header
