import React, { useState, useEffect } from 'react';
import '../style/collection.scss';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { List, ListItemText } from '@mui/material';
import { useData } from '../contexts/DataContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const options = ['Run collection', 'Add request', 'Add folder', 'Delete'];
const ITEM_HEIGHT = 50;

export default function Collection(props) {
  const { workspaceId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [collections, setCollections] = useState([]);
  const [clickCollection, setClickCollection] = useState(null);
  const navigate = useNavigate();
  const { requestItems, setRequestItems } = useData();

  const handleListClick = (collectionId) => {
    if (collectionId !== clickCollection) {
      setClickCollection(collectionId);
    }
  };

  useEffect(() => {
    const loadCollectionsFromLocalStorage = () => {
      const collections = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`collection-${workspaceId}`)) {
          const collection = JSON.parse(localStorage.getItem(key));
          collections.push(collection);
        }
      }
      setCollections(collections);
      console.table(collections);
    };
    loadCollectionsFromLocalStorage();
  }, [workspaceId]);

  const handleClick = (e) => {
    if (e.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option, collectionId) => {
    if (option === 'Delete') {
      handleDeleteClick(collectionId);
    } else if (option === 'Run collection') {
    } else if (option === 'Add request') {
      navigate(
        `/workspaces/${workspaceId}/collections/${collectionId}/:requestName`
      );
    }
    handleClose();
  };

  const handleDeleteClick = (collectionId) => {
    if (!window.confirm('Delete collection?')) return false;

    localStorage.removeItem(`collection-${workspaceId}-${collectionId}`);

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith(`request-${collectionId}-`)) {
        localStorage.removeItem(key);
      }
    }

    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.id !== collectionId)
    );

    navigate(`/workspaces/${workspaceId}`);
  };

  const handleRequestDeleteClick = (e, collectionId) => {
    e.preventDefault();
    if (!window.confirm('Delete request?')) return false;

    if (requestItems[collectionId]) {
      requestItems[collectionId].forEach((item) => {
        const key = `request-${collectionId}-${item.data.name}`;
        localStorage.removeItem(key);
        const paramsKey = `paramsData-${item.data.name}`;
        localStorage.removeItem(paramsKey);
      });
    }

    setRequestItems((prevRequestItems) => {
      const updatedRequestItems = { ...prevRequestItems };
      delete updatedRequestItems[collectionId];
      return updatedRequestItems;
    });

    navigate(`/workspaces/${workspaceId}/collections/${collectionId}`);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...collections];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCollections(items);
  };

  return (
    <div>
      <div className="collection_container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="collections">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {collections.map((collection, index) => (
                  <Draggable
                    key={collection.id}
                    draggableId={String(collection.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Link
                          to={`/workspaces/${workspaceId}/collections/${collection.id}`}
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <ListItemButton
                            onClick={() => handleListClick(collection.id)}
                          >
                            {clickCollection === collection.id ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}

                            <ListItemText primary={collection.collectionname} />
                            <div
                              className="collection_list_options"
                              style={{ opacity: open ? 1 : 0 }}
                            >
                              <IconButton
                                style={{
                                  position: 'relative',
                                }}
                                disableRipple
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                              >
                                <MoreVertIcon />
                              </IconButton>

                              <Menu
                                id="long-menu"
                                MenuListProps={{
                                  'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                  },
                                }}
                                onMouseDownCapture={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {options.map((option) => (
                                  <MenuItem
                                    key={option}
                                    selected={option === 'Delete'}
                                    onClick={() =>
                                      handleOptionClick(option, collection.id)
                                    }
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </div>
                          </ListItemButton>
                          <Collapse
                            in={clickCollection === collection.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {requestItems[collection.id] &&
                                requestItems[collection.id].map((item) => (
                                  <Link
                                    to={`/workspaces/${workspaceId}/collections/${collection.id}/${item.data.name}`}
                                    style={{
                                      textDecoration: 'none',
                                      color: 'black',
                                    }}
                                    key={item.key}
                                  >
                                    <ListItemButton>
                                      <ListItemText
                                        primary={`${item.data.request.method} - ${item.data.name}`}
                                      />
                                      <button
                                        type="button"
                                        onClick={(e) =>
                                          handleRequestDeleteClick(
                                            e,
                                            collection.id
                                          )
                                        }
                                      >
                                        삭제
                                      </button>
                                    </ListItemButton>
                                  </Link>
                                ))}
                            </List>
                          </Collapse>
                        </Link>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
