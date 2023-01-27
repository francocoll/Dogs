import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const DogCard = ({ name, image, id, weightMin, weightMax, temperament }) => {
  return (
    <Card sx={{ maxWidth: 395 }}>
      <CardActionArea>
        <Link to={`/dogs/${id}`}>
          <CardMedia
            component="img"
            height="220"
            width="100"
            image={image}
            alt="green iguana"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span>{weightMin} - {weightMax} kg</span>
            <p>
              {temperament}
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DogCard