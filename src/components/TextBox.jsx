import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTextBox, deleteTextBox, selectTextBox } from '../redux/textBoxSlice';
import Draggable from 'react-draggable';
import { Box, Slider, Typography, TextField, Button, IconButton } from '@mui/material';
import { X } from "react-bootstrap-icons";
import '../styles/TextBox.css';

const TextBox = ({ box }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOutsideClicked, setIsOutsideClicked] = useState(false);
  const textBoxRef = useRef(null);
  const modalRef = useRef(null);

  const handleDrag = (e, data) => {
    dispatch(updateTextBox({ id: box.id, updates: { x: data.x, y: data.y } }));
  };

  // const handleResize = (event, newValue) => {
  //   dispatch(updateTextBox({ id: box.id, updates: { width: newValue[0], height: newValue[1] } }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateTextBox({ id: box.id, updates: { [name]: value } }));
  };

  // const handleFontChange = (event, newValue) => {
  //   dispatch(updateTextBox({ id: box.id, updates: { fontSize: newValue } }));
  // };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteTextBox(box.id));
  };

  const handleDoubleClick = () => {
    setIsEditing(!isEditing);
    dispatch(selectTextBox(box.id));
  };

  const handleApply = () => {
    setIsEditing(false);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOutsideClicked(true);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOutsideClicked) {
      setIsEditing(false);
      setIsOutsideClicked(false);
    }
  }, [isOutsideClicked]);

  const textStyle = {
    fontWeight: box.textStyle.fontWeight,
    fontStyle: box.textStyle.fontStyle,
    textDecoration: box.textStyle.textDecoration,
  };

  return (
    <Draggable bounds="parent" position={{ x: box.x, y: box.y }} onStop={handleDrag}>
      <Box
        ref={textBoxRef}
        className="text-box-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: box.width,
          height: box.height,
          fontSize: box.fontSize,
          fontFamily: box.fontFamily,
          color: box.color,
          border: `${box.strokeWidth}px solid ${box.stroke}`,
          padding: '5px',
          cursor: 'move',
          resize: 'both',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: isEditing ? '#f5f5f5' : 'transparent',
        }}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing && !isOutsideClicked ? (
          <Box className="text-box-edit" ref={modalRef}>
            <TextField name="text" fullWidth multiline value={box.text} onChange={handleChange} variant="outlined" />
            <Button onClick={handleApply}>Apply</Button>
          </Box>
        ) : (
          <>
            <Box
              className="text-box-content"
              style={{
                ...textStyle,
                textAlign: box.textStyle.textAlign,
              }}
            >
              {box.text}
            </Box>
            {isHovered && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="delete"
                onClick={handleDelete}
                sx={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  color: 'red',
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover' },
                  p: 1,
                  zIndex: 1,
                }}
              >
                <X size={24} />
              </IconButton>
            )}
          </>
        )}
      </Box>
    </Draggable>
  );
};

export default TextBox;