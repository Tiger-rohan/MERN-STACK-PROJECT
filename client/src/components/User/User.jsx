import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function User () {
    const { user } = useSelector(state => state.user);
    const user_id = user.user_id
    useEffect


    return <div> Hi {user.user_name} {user.user_id}</div>
}

export default User;