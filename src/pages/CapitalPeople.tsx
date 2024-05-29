import React from "react";
import {NavBar} from "../elements/NavBar/NavBar";
import Section from "../elements/Section/section";

export default function SectionPage({props}) {
    return(
        <div className='bg-black'>
            <NavBar/>
            <h1>{props.nombre}</h1>
            <Section />
        </div>
    )
}