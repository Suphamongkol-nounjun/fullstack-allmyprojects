"use client";
import React, { useState, useEffect } from "react";
import { Container, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { checktoken } from "@/app/utils/checktoken";

export async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attraction/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Page = ({ params }) => {
  const [data, setData] = useState(null); // เปลี่ยนเป็น null แทนการใช้งาน []

  if (!process.env.NEXT_PUBLIC_API_URL) {
    return null; // ถ้าไม่มี NEXT_PUBLIC_API_URL จะ return ก่อนเลย
  }

  const fetchData = async () => {
    try {
      const result = await getData(params.id);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    checktoken(); // สมมติว่าต้องการเรียก checktoken ทุกครั้งที่ component mount
    fetchData(); // เรียก fetchData หลังจาก checktoken เสร็จสิ้น
  }, [params.id]); // ให้ useEffect รันใหม่เมื่อ params.id เปลี่ยนแปลง

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      {data && ( // ตรวจสอบว่ามี data อยู่หรือไม่ก่อน render
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data[0].name}
            </Typography>
          </CardContent>
          <CardMedia
            sx={{ height: 400 }}
            image={data[0].coverimage}
            title={data[0].name}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data[0].detail}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default Page;
