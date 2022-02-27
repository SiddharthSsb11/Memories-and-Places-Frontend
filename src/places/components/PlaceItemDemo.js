import React, { useState, useContext, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Badge, Box, Text } from "@chakra-ui/layout";
import {
  Image,
  IconButton,
  Spinner,
  Heading,
  Input,
  Icon,
} from "@chakra-ui/react";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { AuthContext } from "../../shared/context/auth-context";
import { useToast } from "@chakra-ui/toast";
import { FaRegHeart } from "react-icons/fa";
import { CalendarIcon, SmallCloseIcon, CheckIcon } from "@chakra-ui/icons";
import { GiMagicSwirl } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/input";

//import { useHistory } from "react-router-dom";
import formatDate from "../../shared/util/formatDate";
import CommentList from "./CommentList";
//import { Button } from "@chakra-ui/button";

import "./PlaceItemDemo.css";

const PlaceItemDemo = (props) => {
  const { like, comment } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(like.length);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([comment]); //[...comments]
  const [commentsCount, setCommentsCount] = useState(comment.length);
  //console.log(comment)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();
  const toast = useToast();

  const auth = useContext(AuthContext);
  const { token, userId } = auth;

  useEffect(() => {
    if (like.some((like) => like.user === userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [userId, like]); //check h/t

  const likeHandler = async () => {
    if (!token) {
      toast({
        title: "Oops !! Please Login First",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (!isLiked) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setLoading(true);
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/places/like/${props.id}`,
          {},
          config
        );
        setIsLiked(true);
        setLikesCount(data.place.likes.length);
        props.onLike(data);
        setLoading(false);
        //console.log(data);
      } catch (err) {
        console.log(err.message);
        toast({
          title: "Error Occured!",
          description: "Failed to Like, Please try Reloading",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else if (isLiked) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setLoading(true);
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/places/unlike/${props.id}`,
          {},
          config
        );
        setIsLiked(false);
        setLikesCount(data.place.likes.length);
        props.onLike(data);
        setLoading(false);
        //console.log(data);
      } catch (err) {
        console.log(err.message);
        toast({
          title: "Error Occured!",
          description: "Failed to unlike, Please try Reloading",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
    console.log("liked");
  };

  const commentHandler = async () => {
    if (newComment && newComment.length > 0) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/places/comment/${props.id}`,
          {
            text: newComment,
          },
          config
        );

        console.log(data.place, "comment submit response data");
        setNewComment("");
        setComments([data.place.comments]);
        setCommentsCount(data.place.comments.length);
        props.onComment(data);

        toast({
          title: "Comment Added!",
          //description: "Comment Added",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      } catch (err) {
        console.log(err.message);
        toast({
          title: "Error Occured!",
          //description: "Failed to add the comment",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  console.log(comment, "comment as prop");
  console.log(comments, "comments stored");


  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    console.log("DELETING...");

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id); //UserPlaces--->deletedPlaceId
    } catch (err) {
      console.log(
        err.message,
        "Error handling on BE Server, Logginf delete PLace error FE "
      );
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h3>Maps will be here soon. Feature service down temporarily.</h3>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <Box
        d="flex"
        mb={5}
        flexDir="column"
        gap="0.5rem"
        bg="white"
        borderRadius="7px"
        border="1.5px solid black"
        width="100%"
        //overflow="hidden"
        pb={3}
      >
        <Box height="21rem" width="100%" p={2}>
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="5px"
            src={props.image}
            alt={props.title}
          />
        </Box>
        <Box
          d="flex"
          flexDir="column"
          width="100%"
          alignItems="center"
          justifyContent="center"
          gap="0.1rem"
          pb={2.5}
          borderBottom="1px solid #ccc"
        >
          <Box
            d="flex"
            px={3.5}
            //py={0.5}

            width="100%"
            alignItems="center"
            //justifyContent="space-between"
          >
            <Heading as="h3" size="lg" flexGrow="1" textAlign="left">
              {props.title}
            </Heading>
            <Box d="flex" alignItems="center" gap="0.2rem">
              {loading ? (
                <Spinner
                  size="lg"
                  w={10}
                  h={10}
                  alignSelf="center"
                  margin="auto"
                  color="black"
                />
              ) : (
                <>
                  <IconButton
                    variant="ghost"
                    //borderRadius="90%"
                    color={isLiked ? "red.500" : "black"}
                    size="lg"
                    //colorScheme="red"
                    _hover={{ color: "red.200" }}
                    aria-label="Like"
                    //bg="red.600"
                    fontSize="2.2rem"
                    fontWeight="bold"
                    icon={<FaRegHeart />}
                    onClick={likeHandler}
                  />
                  <Text fontWeight="bold" fontSize="md" /* alignSelf="end" */>
                    {likesCount} {likesCount === 1 ? "Like" : "Likes"}
                  </Text>
                </>
              )}
            </Box>
          </Box>

          <Text px={3.5} width="100%" textAlign="left">
            {props.description}
          </Text>
        </Box>
        <Box
          d="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          py={2.5}
          px={3.5}
        >
          <Box
            d="flex"
            alignItems="center"
            //justifyContent="space-between"
            flexDir={{ base: "column", md: "row" }}
            gap="0.5rem"
          >
            <Avatar
              size="lg"
              name={props.creator.name}
              src={props.creator.image}
              border="1.5px solid black"
            >
              <AvatarBadge
                boxSize="1.3em"
                bg="purple.700"
                d="flex"
                alignItems="center"
                justifyContent="center"
                borderColor="black"
                border="4px solid"
              >
                <Text fontSize="sm" color="white" fontWeight="bold">
                  {props.creator.places.length}
                </Text>
              </AvatarBadge>
            </Avatar>
            <Box
              //d={{ base: "none", md: "flex" }}
              d="flex"
              flexDir="column"
              alignItems="start"
              justifyContent="start"
              gap="0.3rem"
            >
              <Text
                variant="solid"
                colorScheme="gray"
                fontSize="xs"
                //_hover={{ background: "pink.300", color: "gray.800" }}
                mt={-1.5}
                fontWeight="bold"
              >
                Shared By:
              </Text>
              <Badge
                textAlign="center"
                variant="solid"
                bg="purple.700"
                fontSize="sm"
                _hover={{ background: "yellow.400", color: "gray.800" }}
                py={0.5}
                px={2.5}
                borderRadius="5px"
              >
                {props.creator.name.split(" ")[0]}
              </Badge>
            </Box>
          </Box>

          <Box
            d="flex"
            //width="100%"
            alignItems="center"
            //justifyContent="space-evenly"
            gap="0.2rem"
          >
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP&nbsp;&#10132;
            </Button>

            {userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                {" "}
                DELETE{" "}
              </Button>
            )}
          </Box>

          <Box
            d="flex"
            alignItems="center"
            //justifyContent="space-between"
            gap="5px"
            cursor="pointer"
          >
            <Icon
              as={CalendarIcon}
              //w={{ base: 8, md: 12 }}
              //h={{ base: 8, md: 12 }}
              w={12}
              h={12}
              color="purple.700"
              _hover={{ color: "yellow.400" }}
            />
            <Box
              d={{ base: "none", md: "flex" }}
              flexDir="column"
              alignItems="start"
              gap="4px"
            >
              <Text
                variant="solid"
                colorScheme="gray"
                fontSize="xs"
                //_hover={{ background: "pink.300", color: "gray.800" }}
                mt={-1.5}
                fontWeight="bold"
              >
                Added on:
              </Text>
              <Badge
                variant="solid"
                bg="purple.700"
                fontSize="xs"
                _hover={{ background: "yellow.400", color: "gray.800" }}
                py={0.5}
                px={2}
                borderRadius="5px"
              >
                {formatDate(props.date)}
              </Badge>
            </Box>
          </Box>
        </Box>

        <Box
          d="flex"
          flexDir="column"
          gap="0.4rem"
          width="100%"
          justifyContent="center"
          alignItems="center"
          borderTop="1px solid #ccc"
        >
          <Accordion allowToggle width="95%" mt={3} borderRadius="5px">
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "gray.700", color: "white" }}
                  bg="gray.200"
                >
                  <Box
                    d="flex"
                    flex="1"
                    alignItems="center"
                    justifyContent="space-between"
                    textAlign="left"
                    fontWeight="bold"
                  >
                    All Comments
                    <Text fontSize="xs" color="gray.500" marginRight="1.2rem">
                      No. of {commentsCount === 1 ? "Comment" : "Comments"}:{" "}
                      {commentsCount}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <CommentList comments={comments} placeId={props.id} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <InputGroup width="95%">
            <InputLeftElement
              children={
                <IconButton
                  variant="ghost"
                  borderRadius="50%"
                  color="red.400"
                  //colorScheme="red"
                  _hover={{ color: "red.600" }}
                  aria-label="Call Segun"
                  //bg="red.800"
                  size="xl"
                  icon={<SmallCloseIcon />}
                  onClick={(e) => setNewComment("")}
                />
              }
            />
            <Input
              //size="sm"
              colorScheme="gray"
              type="text"
              variant="filled"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              focusBorderColor="gray.500"
              errorBorderColor="red.300"
            />
            <InputRightElement
              children={
                <IconButton
                  variant="ghost"
                  borderRadius="50%"
                  color="green.400"
                  //colorScheme="red"
                  _hover={{ color: "green.500" }}
                  aria-label="Call Segun"
                  //bg="red.800"
                  size="lg"
                  icon={<CheckIcon />}
                  onClick={commentHandler} //commentHandler
                />
              }
            />
          </InputGroup>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default PlaceItemDemo;
