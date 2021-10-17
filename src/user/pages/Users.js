import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
    const DUMMY_USERS = [
        {
            id: 'u1',
            name: 'Bear Grylls',
            image: 'https://d2w1le1t5r6d3w.cloudfront.net/Team/_1200x801_crop_center-center_82_line/DSC06531.jpg',
            places: 3
        }
    ];

    return (
        <UsersList items = {DUMMY_USERS}></UsersList>
    )
}

export default Users
