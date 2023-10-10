
import {useState} from 'react';

const GenerateColor = () => {
    const [color, setColor] = useState("");
    const generateRandomColor = () => {
        setColor(Math.random().toString(16).substr(-6));
    };
    return {color, generateRandomColor};

}
export default GenerateColor;