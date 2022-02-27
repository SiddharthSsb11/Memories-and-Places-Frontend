import React from "react";
import { Box,  } from "@chakra-ui/layout";
import Card from "../../shared/components/UIElements/Card";
import CommentItem from "./CommentItem";
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
  console.log(props.comments)
  return (
    <Box
      d="flex"
      flexDir="column"
      gap="0.35em"
      //py={1}
      px={2}
      alignItems="center"
      justifyContent="start"
      maxH="6.1em"
      overflow="auto"
      //bg="purple.500"
      width="100%"
      borderRadius="0.45em"
      //border="1px solid black">
    >
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} 
            placeId={props.placeId}
            commentId={comment.id}
            user={comment.user}
            text={comment.text}
            name={comment.name}
            image={comment.avatar}
            date={comment.date}
            onDelete={props.deleteComment}
        />
      ))}
    </Box>
  );
};

export default CommentList;
