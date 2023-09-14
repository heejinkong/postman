import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listActions } from '../slice/listSlice';
import WorkspaceList from './WorkspaceList';

const ListPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listActions.getList());
    }, [dispatch]);

    const list = useSelector((state) => state.listReducers.list);
    return (
        <div>
            <WorkspaceList list={list} />
        </div>
    );
};

export default ListPage;