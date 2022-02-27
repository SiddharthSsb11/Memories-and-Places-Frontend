import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import AllPlaceList from "../components/AllPlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const AllPlaces = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  /* const params = useParams();
  const userId = params.userId; */

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places`
        );
        //console.log(responseData);
        setAllPlaces(responseData.places); //.places
      } catch (err) {
        console.log(err, "getting all the palces error");
      }
    };
    fetchPlaces();
  }, [sendRequest]); //check dep h/t

  const placeLikeHandler = (p) => {
    console.log("like handler in all Places homepage");
    setAllPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === p.id ? { ...place, likes: p.likes } : place
      )
    );
    //window.location.reload();
  };

  const commentPlaceHandler = (p) => {
    setAllPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === p.id ? { ...place, comments: p.comments } : place
      )
    );
    window.location.reload();
  };

  const placeDeletedHandler = (deletedPlaceId) => {
    setAllPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
    window.location.reload();
  };

  const commentDeleteHandler = (p)=>{
   /*  setAllPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === p.id ? { ...place, comments: p.comments } : place
      )
    ); */
    window.location.reload();
  }
  console.log(allPlaces, "allPlaces");

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && allPlaces && (
        <AllPlaceList
          items={allPlaces}
          onLikePlace={placeLikeHandler}
          onDeletePlace={placeDeletedHandler}
          onCommentPlace={commentPlaceHandler}
          onCommentDelete = {commentDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default AllPlaces;
