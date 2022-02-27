import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceItem from "../components/PlaceItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../components/PlaceList.css";

const Place = () => {
  const [singlePlace, setSinglePlace] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const params = useParams();
  const placeId = params.placeId;

  useEffect(() => {
    
      const fetchPlace = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
          );
          console.log(responseData);
          setSinglePlace(responseData.place); //.places
        } catch (err) {
          console.log(err, "getting single place error");
        }
      };
      
    
    /* const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
        //console.log(responseData);
        setSinglePlace(responseData.place); //.places
      } catch (err) {console.log(err, 'getting single place error')}
    };
    fetchPlace(); */
    fetchPlace();
  }, [sendRequest, placeId]); //check dep h/t

  const placeLikeHandler = (p) => {
    console.log("like handler in all Places homepage");
    singlePlace((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === p.id ? { ...place, likes: p.likes } : place
      )
    );
    //window.location.reload();
  };

  const placeDeletedHandler = (deletedPlaceId) => {
    setSinglePlace((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  console.log(singlePlace, "single place");

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <ul className="place-list">
        {!isLoading && singlePlace && (
          <PlaceItem
            key={singlePlace.id}
            id={singlePlace.id}
            image={singlePlace.image}
            title={singlePlace.title}
            description={singlePlace.description}
            address={singlePlace.address}
            creatorId={singlePlace.creator.id}
            creator={singlePlace.creator}
            coordinates={singlePlace.location}
            onDelete={placeDeletedHandler}
            createdAt={singlePlace.createdAt}
            date={singlePlace.date}
            like={singlePlace.likes}
            onLike={placeLikeHandler}
            comments={singlePlace.comments}
          />
        )}
      </ul>
    </React.Fragment>
  );
};

export default Place;
