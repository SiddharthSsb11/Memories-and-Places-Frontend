import React from 'react';
import {useParams} from 'react-router-dom'

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Vietnam Jungle',
    description: 'Dense Asian jungle can be a "dark and forbidding place"',
    imageUrl: 'https://static1.thetravelimages.com/wordpress/wp-content/uploads/2018/08/china-chinese.fansshare.com_.jpg?q=50&fit=crop&w=740&h=556&dpr=1.5',
    address: 'Hamlet 4, Nam Cat Tien, Tan Phu District, Nam Cat Tien Vietnam',
    location: {
      lat: 11.752252284264282, 
      lng: 107.46413427724953,
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      
      lat: 40.7484405,
      lng: -73.9878584,
      
    },
    creator: 'u2'
  }
];

const UserPlaces = () => {

    const params = useParams();
    //console.log(params);
    const userId = params.userId;
    const userPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    
  return <PlaceList items={userPlaces} />;
};

export default UserPlaces;