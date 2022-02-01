import React from 'react';
import { useParams } from 'react-router-dom';

import FavouriteList from '../components/FavouriteList';
import BorrowList from '../components/BorrowList';

//import Auth from "../utils/auth"
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';

const Profile = (props) => {
    const { username: userParam } = useParams();
    

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    //     return <Redirect to="/profile" />;
    // }
    
    if (!user?.username) {
        return (
          <h4>
            Please LogIn or Sign-Up.
          </h4>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className='container w-100%'>
            <div className="flex-row mb-3">
                <h2 className="bg-dark text-secondary p-3 display-inline-block">
                  Viewing {user.username}'s profile.
                </h2>
            </div>
            <div className='col-lg-12 m-0'>
            <div className='flex-row'>
                
                <div className="col-5 mb-3 col-lg-6">
                    <BorrowList
                      borrowList={user.borrowList}
                    />
                </div>
                <div className='col-5 mb-3 col-lg-6'>
                    <FavouriteList
                        favouriteList={user.favouriteList}
                    /> 
                </div>   
               
                
            </div>
            </div>
        </div>
    );
};

export default Profile;
