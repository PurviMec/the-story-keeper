import React from 'react';
import { useParams } from 'react-router-dom';

import FavouriteList from '../components/FavouriteList';
import BorrowList from '../components/BorrowList';


import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = (props) => {
    const { username: userParam } = useParams();
    

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam}
    });

    const user = data?.user || {};

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
