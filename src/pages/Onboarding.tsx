import React, { useState, useEffect } from 'react';
import Gallery from '../elements/Gallery/gallery';
import IGallery1 from '../../public/assets/RaySolans_Onboarding_IGallery_1.jpg';
import IGallery2 from '../../public/assets/RaySolans_Onboarding_IGallery_2.jpg';
import IGallery3 from '../../public/assets/RaySolans_Onboarding_IGallery_3.jpg';
import { NavBar } from '../elements/NavBar/NavBar';
import {motion} from "framer-motion";
import Section from "../elements/Section/section";

export default function Onboarding() {
    const imgArray = [IGallery1, IGallery2, IGallery3];
    return (
            <div className='bg-black'>
                <NavBar />
                <div className='gradient'/>
                <Gallery imgArray={imgArray} imgCount={imgArray.length} />
                <div className='flex flex-col items-center'>
                    <div className='flex flex-row gap-40 items-center bg-black pt-10 px-20'>
                        <div className='flex flex-col justify-center'>
                            <text className='text-white text-9xl font-bold'>
                                IMÁGENES
                            </text>
                            <text className='text-white text-4xl'>
                                con un significado que
                            </text>
                            <text className='text-white text-9xl font-bold'>
                                TRANSCIENDE
                            </text>
                        </div>
                        <text className='text-white text-xl self-start'>
                            La combinación de mi pasión por la fotografía y el cine me posiciona en un lugar único en el mundo del reportaje. (Texto genérico)
                        </text>
                    </div>
                </div>
                <Section/>
            </div>
    )
}