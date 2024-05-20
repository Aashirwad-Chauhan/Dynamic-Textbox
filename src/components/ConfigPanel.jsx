import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTextBox, addTextBox } from '../redux/textBoxSlice';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, IconButton } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';
import '../styles/ConfigPanel.css';

const ConfigPanel = () => {
  const dispatch = useDispatch();
  const selectedBox = useSelector((state) => state.textBox.selectedBox);

  if (!selectedBox) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumberField = ['width', 'height', 'fontSize', 'strokeWidth', 'x', 'y'].includes(name);
    const parsedValue = isNumberField ? parseInt(value, 10) : value;
    dispatch(updateTextBox({ id: selectedBox.id, updates: { [name]: parsedValue } }));
  };

  const handleTextFormatting = (style) => {
    const updatedTextStyle = { ...selectedBox.textStyle, ...style };
    console.log('Updating text style:', updatedTextStyle);
    dispatch(updateTextBox({ id: selectedBox.id, updates: { textStyle: updatedTextStyle } }));
  };

  const handleTextAlign = (alignment) => {
    handleTextFormatting({ textAlign: alignment });
  };

  const handleFontWeight = () => {
    const newFontWeight = selectedBox.textStyle.fontWeight === 'bold' ? 'normal' : 'bold';
    handleTextFormatting({ fontWeight: newFontWeight });
  };

  const handleFontStyle = () => {
    const newFontStyle = selectedBox.textStyle.fontStyle === 'italic' ? 'normal' : 'italic';
    handleTextFormatting({ fontStyle: newFontStyle });
  };

  const handleTextDecoration = () => {
    const newTextDecoration = selectedBox.textStyle.textDecoration === 'underline' ? 'none' : 'underline';
    handleTextFormatting({ textDecoration: newTextDecoration });
  };

  return (
    <div className="config-panel">
      {/* <Button variant="contained" color="primary" onClick={() => dispatch(addTextBox())} fullWidth>
        Add Text
      </Button> */}
      <div className="config-section">
        <h3>Position</h3>
        <div className="position-inputs">
          <TextField label="X" type="number" name="x" value={selectedBox.x} onChange={handleChange} />
          <TextField label="Y" type="number" name="y" value={selectedBox.y} onChange={handleChange} />
          <TextField label="W" type="number" name="width" value={selectedBox.width} onChange={handleChange} />
          <TextField label="H" type="number" name="height" value={selectedBox.height} onChange={handleChange} />
        </div>
      </div>
      <div className="config-section">
        <h3>Text</h3>
        <FormControl fullWidth margin="normal">
          <InputLabel>Font Family</InputLabel>
          <Select name="fontFamily" value={selectedBox.fontFamily} onChange={handleChange}>
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Poppins">Poppins</MenuItem>
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            <MenuItem value="Courier New">Courier New</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Font Weight</InputLabel>
          <Select name="fontWeight" value={selectedBox.fontWeight} onChange={handleChange}>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="bold">Bold</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Font Size" type="number" name="fontSize" value={selectedBox.fontSize} onChange={handleChange} fullWidth margin="normal" />
        <div className="text-formatting">
          <IconButton onClick={() => handleTextAlign('left')}>
            <FormatAlignLeft />
          </IconButton>
          <IconButton onClick={() => handleTextAlign('center')}>
            <FormatAlignCenter />
          </IconButton>
          <IconButton onClick={() => handleTextAlign('right')}>
            <FormatAlignRight />
          </IconButton>
          <IconButton onClick={handleFontWeight}>
            <FormatBold />
          </IconButton>
          <IconButton onClick={handleFontStyle}>
            <FormatItalic />
          </IconButton>
          <IconButton onClick={handleTextDecoration}>
            <FormatUnderlined />
          </IconButton>
        </div>
      </div>
      <div className="config-section">
        <h3>Fill</h3>
        <TextField label="Color" type="color" name="color" value={selectedBox.color} onChange={handleChange} fullWidth margin="normal" />
      </div>
      <div className="config-section">
        <h3>Stroke</h3>
        <TextField label="Stroke" type="color" name="stroke" value={selectedBox.stroke} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Stroke Width" type="number" name="strokeWidth" value={selectedBox.strokeWidth} onChange={handleChange} fullWidth margin="normal" />
      </div>
    </div>
  );
};

export default ConfigPanel;