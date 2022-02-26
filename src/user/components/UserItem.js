import React from 'react';
import {Link} from 'react-router-dom'

import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'

import './UserItem.css';


const UserItem = props => {
    //{`${process.env.REACT_APP_ASSET_URL}/${props.image}`} image b4 aws-s3
    console.log(props.image, props.name,'props.image userItem props.name');
  return (
    <li className="user-item">
        <Card className="user-item__content">
            <Link to={`/${props.id}/places`}> 
                <div className="user-item__image">
                    <Avatar Avatar image ={props.image} alt = {props.name}></Avatar>
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <h3 style={{fontWeight:"bold"}}>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>
    </li>
  );
};

export default UserItem;