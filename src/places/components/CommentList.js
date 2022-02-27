import React from "react";
import { Box,  } from "@chakra-ui/layout";
import Card from "../../shared/components/UIElements/Card";
import CommentItem from "./PlaceItem";
//import Button from "../../shared/components/FormElements/Button";

import "./PlaceList.css";

const CommentList = (props) => {
  if (props.comments.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Comments found. Try Adding one?</h2>
        </Card>
      </div>
    );
  }

  return (
    <Box
      d="flex"
      flexDir="column"
      gap="0.8em"
      //py={1}
      px={2}
      alignItems="center"
      justifyContent="start"
      maxH="14em"
      overflow="auto"
      //bg="purple.500"
      width="100%"
      borderRadius="0.45em"
      //border="1px solid black">
    >
      {props.comments.map((comment) => (
        <CommentItem 
            key={comment.id} 
            pid={props.placeId}        
        />
      ))}
    </Box>
  );
};

export default CommentList;
