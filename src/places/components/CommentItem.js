import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Icon } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { DeleteIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import axios from "axios";
import formatDate from "../../shared/util/formatDate";
import { AuthContext } from "../../shared/context/auth-context";
import { Tooltip } from "@chakra-ui/tooltip";
import { useHttpClient } from "../../shared/hooks/http-hook";

const CommentItem = (props) => {
  const toast = useToast();
  const auth = useContext(AuthContext);
  const { token, userId } = auth;
  const { error, sendRequest, clearError } = useHttpClient();

  const deleteHandler = async() => {
    if(!token){
      toast({
        title: "Oops !! Please Login First",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const {data} = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/comment/${props.placeId}/${props.commentId}`, //places/comment/:pid/:cid
        "DELETE",
        null,
        { Authorization: "Bearer " + token }
      );
      //console.log(data)
      console.log(data)
      props.onDelete(data); 
    } catch (err) {
      console.log(
        err.message,
        "Error handling on BE Server, Logginf delete PLace error FE "
      );
    }


  }
  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="0.4em"
      border="1px solid black"
      bg="purple.100"
      width="100%"
      p={1.5}
      gap="0.5rem"
    >
      <Tooltip label={props.name} placement="bottom-start" hasArrow size="sm">
        <Avatar
          size="sm"
          name={props.name}
          src={props.image}
          border="1px solid black"
        />
      </Tooltip>

      <Text
        fontWeight="bold"
        fontSize="sm"
        textAlign="left"
        flexGrow="1"
        color="black"
      >
        {props.text}
      </Text>
      <Text fontSize="xs" color="gray.700" marginRight="0.4rem">
        {" "}
        {formatDate(props.date).slice(0, 6)}{" "}
      </Text>
      {userId === props.user && (
        <IconButton
          variant="ghost"
          bg="gray.700"
          color="white"
          size="sm"
          fontSize="sm"
          _hover={{ background: "gray.800", color: "red.500" }}
          aria-label="Delete Transaction"
          icon={<DeleteIcon />}
          onClick={deleteHandler}
        />
      )}
    </Box>
  );
};

export default CommentItem;
