import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

import './PlaceList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  //likest//comments//creator,
  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem 
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator.id}  
          creatorImage={place.creator.image}
          creatorPlacesLength={place.creator.places.length}
          creatorName={place.creator.name}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
          createdAt={place.createdAt}
          date={place.date}
          like={place.likes.likes}    
          onLike={props.onLikePlace}
          comment={place.comments}  
          onComment={props.onCommentPlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
