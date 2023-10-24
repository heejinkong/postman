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

  // 클릭한 컬렉션 열고 닫는 함수
  const handleListClick = (collectionId) => {
    if (collectionId !== clickCollection) {
      setClickCollection(collectionId);
    }
  };

  // 로컬스토리지에서 컬렉션 정보를 가져와 state 상태 업데이트
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

  //메뉴 열기
  const handleClick = (e) => {
    if (e.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  //메뉴 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };

  //옵션 선택 시 처리 함수
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

  //컬렉션 삭제
  const handleDeleteClick = (collectionId) => {
    if (!window.confirm('Delete collection?')) return false;

    //로컬 스토리지에서 컬렉션 제거
    localStorage.removeItem(`collection-${workspaceId}-${collectionId}`);

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith(`request-${collectionId}-`)) {
        localStorage.removeItem(key);
      }
    }

    //컬렉션 목록에서 삭제
    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.id !== collectionId)
    );

    //업데이트
    navigate(`/workspaces/${workspaceId}`);
  };

  //요청 삭제
  const handleRequestDeleteClick = (e, collectionId) => {
    e.preventDefault();
    if (!window.confirm('Delete request?')) return false;

    //연관된 request와 dataRow 삭제
    if (requestItems[collectionId]) {
      requestItems[collectionId].forEach((item) => {
        const key = `request-${collectionId}-${item.data.name}`;
        localStorage.removeItem(key);
        const paramsKey = `paramsData-${collectionId}-${item.data.name}`;
        localStorage.removeItem(paramsKey);
      });
    }

    //상태에서 요청 삭제
    setRequestItems((prevRequestItems) => {
      const updatedRequestItems = { ...prevRequestItems };
      delete updatedRequestItems[collectionId];
      return updatedRequestItems;
    });

    navigate(`/workspaces/${workspaceId}/collections/${collectionId}`);
  };

  //드래그 앤 드롭 이벤트 처리
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    //컬렉션 순서 변경
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
