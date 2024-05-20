import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTextBox } from '../redux/textBoxSlice';
import TextBox from '../components/TextBox';
import ConfigPanel from '../components/ConfigPanel';
import { Button } from '@mui/material';
import '../styles/Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const textBoxes = useSelector((state) => state.textBox.textBoxes);

  const handleAddTextBox = () => {
    dispatch(addTextBox());
  };

  return (
    <div className="home">
      <div className="video-section">
        <video src="../../assets/video.mp4" controls></video>
        {textBoxes.map((box) => (
          <TextBox key={box.id} box={box} />
        ))}
      </div>
      <div className="config-section">
        <Button variant="contained" color="primary" onClick={handleAddTextBox}>
          Add Text
        </Button>
        <ConfigPanel />
      </div>
    </div>
  );
};

export default Home;