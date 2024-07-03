"use client";
import React, { useState, useEffect } from "react";
import { checktoken } from "../utils/checktoken";

import { 
  Card, CardActions, CardContent, CardMedia, Button, Typography, Grid 
} from '@mui/material'

export function getData() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attraction`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return res.json();
    });
}

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    checktoken();
    getData().then(result => setData(result)).catch(error => console.error(error));
  }, []);

  if (!process.env.NEXT_PUBLIC_API_URL) {
    return null;
  }

  return (
    <div>
      <Typography variant='h5'>Attractions</Typography>
      <Grid container spacing={1}>
        {data.map(attraction => (
          <Grid item key={attraction.id} xs={12} md={4}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image={attraction.coverimage}
                title={attraction.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {attraction.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {attraction.detail}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={`/attractions/${attraction.id}`}>
                  <Button size="small">Learn More</Button>
                </a>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
