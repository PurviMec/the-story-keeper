import React from 'react';
import { useParams } from 'react-router-dom';

import FavouriteList from '../components/FavouriteList';
//import BorrowList from '../components/BorrowList';

import Auth from "../utils/auth"
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';

const Profile = (props) => {
    const { username: userParam } = useParams();


    const { loading, data } = useQuery( QUERY_ME, QUERY_USER,{
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
   }
    
    if (!user?.username) {
        return (
          <h4 page-headers>
            Please LogIn or Sign-Up.
          </h4>
        );
    }
    console.log("this is user", user);
    


    return (
        <div className='container w-100% m-0 p-0'>
            <div className="flex-row row mb-3">
                <h2 className=" p-3 display-inline-block page-headers text-center">
                  Viewing {user.username}'s profile.
                </h2>
            </div>
            <div className='col-12 mb-3'>
                <FavouriteList
                    favouriteList={user.favouriteList}
                /> 
            </div>   
    
        </div>
    );
};

export default Profile;
