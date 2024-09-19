"use client";

import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from 'next/link'
import { signIn } from "next-auth/react";
import { useRouter,redirect } from "next/navigation";
import { useSession } from "next-auth/react";

function testpage() {

  
  return (
    <div className="flex">
    {/* Sidebar */}
    <div className="w-1/6 bg-white p-4">
        <div className="flex items-center mb-4">
            <i className="fas fa-bars text-xl"></i>
            <img src="https://placehold.co/80x20" alt="YouTube Logo" className="ml-4"/>
        </div>
        <div className="mb-4">
            <input type="text" placeholder="ค้นหา" className="w-full p-2 border rounded"/>
        </div>
        <div className="space-y-4">
            <div className="flex items-center">
                <i className="fas fa-home text-xl"></i>
                <span className="ml-4">หน้าแรก</span>
            </div>
            <div className="flex items-center">
                <i className="fas fa-video text-xl"></i>
                <span className="ml-4">Shorts</span>
            </div>
            <div className="flex items-center">
                <i className="fas fa-history text-xl"></i>
                <span className="ml-4">การติดตาม</span>
            </div>
            <div className="flex items-center">
                <i className="fas fa-music text-xl"></i>
                <span className="ml-4">YouTube Music</span>
            </div>
        </div>
        <div className="mt-8">
            <h2 className="font-bold mb-4">คุณ</h2>
            <div className="space-y-4">
                <div className="flex items-center">
                    <i className="fas fa-user text-xl"></i>
                    <span className="ml-4">ช่องของคุณ</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-clock text-xl"></i>
                    <span className="ml-4">ประวัติการเข้าชม</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-list text-xl"></i>
                    <span className="ml-4">เพลย์ลิสต์</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-film text-xl"></i>
                    <span className="ml-4">วิดีโอของคุณ</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-clock text-xl"></i>
                    <span className="ml-4">ดูภายหลัง</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-thumbs-up text-xl"></i>
                    <span className="ml-4">วิดีโอที่ชอบ</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-upload text-xl"></i>
                    <span className="ml-4">การอัปโหลด</span>
                </div>
            </div>
        </div>
        <div className="mt-8">
            <h2 className="font-bold mb-4">การติดตาม</h2>
            <div className="space-y-4">
                <div className="flex items-center">
                    <img src="https://placehold.co/30x30" alt="Justinated" className="rounded-full"/>
                    <span className="ml-4">Justinated</span>
                </div>
                <div className="flex items-center">
                    <img src="https://placehold.co/30x30" alt="HookHuukGaming" className="rounded-full"/>
                    <span className="ml-4">HookHuukGaming</span>
                </div>
            </div>
        </div>
    </div>
    {/* Main Content */}
    <div className="w-5/6 bg-gray-100 p-4">
        <div className="flex items-center mb-4">
            <button className="bg-black text-white px-4 py-2 rounded">ทั้งหมด</button>
            <button className="ml-2 bg-gray-200 text-black px-4 py-2 rounded">เกม</button>
            <button className="ml-2 bg-gray-200 text-black px-4 py-2 rounded">ไลฟ์สด</button>
            <button className="ml-2 bg-gray-200 text-black px-4 py-2 rounded">เพลง</button>
            <button className="ml-2 bg-gray-200 text-black px-4 py-2 rounded">เกมเอ็กซ์พลอเจอร์</button>
            <button className="ml-2 bg-gray-200 text-black px-4 py-2 rounded">การ์ตูน</button>
            <button className="ml-2 bg-gray-200 text-black px-4 py-2 rounded">ธรรมชาติ</button>
            <button className="ml-2 bg-gray-200 text-black px-4 py-2 rounded">การท่องเที่ยว</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
                <img src="https://placehold.co/300x200" alt="Video Thumbnail" className="w-full rounded"/>
                <div className="mt-2">
                    <h3 className="font-bold">สุ่มหา 0.1% ให้สองตัวลิง Secret อลูคริดและฮี๊ก ร็อค | Anime Vanguards Roblox</h3>
                    <p className="text-gray-600">กาย หงิด</p>
                    <p className="text-gray-600">การดู 1.6 หมื่น ครั้ง • 15 นาทีที่ผ่านมา</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <img src="https://placehold.co/300x200" alt="Video Thumbnail" className="w-full rounded"/>
                <div className="mt-2">
                    <h3 className="font-bold">สรุปการเดินทาง อิตาลี 9 วัน 8 คืน วีดีเดินทาง พร้อมรีวิวการเที่ยวโดโลไมต์ | VLOG</h3>
                    <p className="text-gray-600">Go Went Go</p>
                    <p className="text-gray-600">การดู 3.2 หมื่น ครั้ง • 22 ชั่วโมงที่ผ่านมา</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <img src="https://placehold.co/300x200" alt="Video Thumbnail" className="w-full rounded"/>
                <div className="mt-2">
                    <h3 className="font-bold">Tower of Fantasy แนะนำวิธีเล่นและความคุ้มค่าของ Meryl ธาตุไฟฟ้า</h3>
                    <p className="text-gray-600">Kana Ibera Ch.</p>
                    <p className="text-gray-600">การดู 36 ครั้ง • 58 นาทีที่ผ่านมา</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <img src="https://placehold.co/300x200" alt="Video Thumbnail" className="w-full rounded"/>
                <div className="mt-2">
                    <h3 className="font-bold">Video Title</h3>
                    <p className="text-gray-600">Channel Name</p>
                    <p className="text-gray-600">Views • Time</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <img src="https://placehold.co/300x200" alt="Video Thumbnail" className="w-full rounded"/>
                <div className="mt-2">
                    <h3 className="font-bold">Video Title</h3>
                    <p className="text-gray-600">Channel Name</p>
                    <p className="text-gray-600">Views • Time</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <img src="https://placehold.co/300x200" alt="Video Thumbnail" className="w-full rounded"/>
                <div className="mt-2">
                    <h3 className="font-bold">Video Title</h3>
                    <p className="text-gray-600">Channel Name</p>
                    <p className="text-gray-600">Views • Time</p>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default testpage;
