import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/listpage.scss';
import { listActions } from '../slice/listSlice';
import WorkspaceList from './WorkspaceList';

const ListPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listActions.getList());
    }, [dispatch]);

    const { list, isLoding, isSuccess } = useSelector((state) => ({
        list: state.listReducers.list,
        isLoding: state.listReducers.isLoding,
        isSuccess: state.listReducers.isSuccess,
    }));

    return (
        <div>
      <div className='home_editor_container'>
        <div className='home_path_container'>
            <div className='home_path_title'>
               
             </div>

         </div>
        <div className='home_description'>
          <div className='home_title'>
          {isSuccess && list.length > 0 ? (
                   <p>Click a Workspace</p>
                ) : (
                    <p>Workspace does not exist </p>
                )}
          </div>
          <div className='home_description_notes' >
          {isSuccess && list.length > 0 ? (
                    <WorkspaceList list={list}/>
                ) : (
                    <p> Create a Workspace using the 'New' button on the left </p>
                )}
          </div>
        </div>
      </div>
    </div>
    );
};

export default ListPage;