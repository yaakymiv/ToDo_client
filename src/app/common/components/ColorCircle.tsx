import { IconButton } from "@mui/material";
import ColorCircleProps from "../../../models/ColorCircleProps";

const ColorCircle: React.FC<ColorCircleProps> = ({ color, onClick }) => (
    <IconButton
        onClick={onClick}
        //otherwise default margin cannot be removed
        style={{ margin: 4,padding:0}}
        sx={{
            color: color,
            '&:hover': {
                backgroundColor: '#fff'
            }, 
        }}
    >
        <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: color }} />
    </IconButton>
);

export default ColorCircle;
