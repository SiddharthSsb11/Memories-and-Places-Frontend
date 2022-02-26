import React, { useState, useContext, useEffect } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Badge, Box, Text } from "@chakra-ui/layout";
import { Image, IconButton, Spinner } from "@chakra-ui/react";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { AuthContext } from "../../shared/context/auth-context";
import { useToast } from "@chakra-ui/toast";
import { FaRegHeart } from "react-icons/fa";
import { GiMagicSwirl } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./PlaceItemDemo.css";

const PLaceItemDemo = (props) => {
  const { like } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(like.length);

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
        console.log(data);
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

  return (
    <Box
      d="flex"
      mb={3.5}
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

      <Box d="flex" alignItems="center" justifyContent="space-between" px={7}>
        <Box
          d="flex"
          alignItems="center"
          //justifyContent="space-between"
          flexDir={{ base: "column", md: "row" }}
          gap="0.8rem"
          cursor="pointer"
          onClick={() => history.push(`/${props.creatorId}/places`)}
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
              variant="solid"
              colorScheme="purple"
              fontSize="md"
              _hover={{ background: "yellow.400", color: "gray.800" }}
              py={0.5}
              px={2.5}
              borderRadius="5px"
            >
              {props.creator.name}
            </Badge>
          </Box>
        </Box>

        <IconButton
          variant="ghost"
          //bg="gray.700"
          color="purple.600"
          size="md"
          fontSize="3.6rem"
          cursor="pointer"
          fontWeight="bold"
          _hover={{ background: "white", color: "yellow.400" }}
          aria-label="Click on Me"
          icon={<GiMagicSwirl className="fa-spin" />}
          onClick={() => console.log("magic")}
        />
        <Box d="flex" alignItems="center" gap="0.5rem">
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
                fontSize="3rem"
                fontWeight="bold"
                icon={<FaRegHeart />}
                onClick={likeHandler}
              />
              <Text fontWeight="bold" fontSize="xl" /* alignSelf="end" */>
                {likesCount} {likesCount === 1 ? "Like" : "Likes"}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PLaceItemDemo;
