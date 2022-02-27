import React, { useState, useContext, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Badge, Box, Text } from "@chakra-ui/layout";
import { Image, IconButton, Spinner, Heading, Input } from "@chakra-ui/react";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { useToast } from "@chakra-ui/toast";
import { Icon } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { CalendarIcon, SmallCloseIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
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
import "./PlaceItem.css";

const PlaceItem = (props) => {
  return(
    <div>Placeitem</div>
    )
};

export default PlaceItem;
