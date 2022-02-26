import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItemDemo from "./PlaceItemDemo";
import Button from "../../shared/components/FormElements/Button";
import './PlaceList.css';

const AllPlaceList = (props) => {

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

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItemDemo 
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator.id}  
          creator={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
          createdAt={place.createdAt}
          date={place.date}
          like={place.likes} 
          onLike={props.onLikePlace}   
          comments={place.comments}    
        />
      ))}
    </ul>
  );
};

export default AllPlaceList;
