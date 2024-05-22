import React from 'react'
import {Togglesize} from "@/components/shared/SizeToggle"

const page = () => {
  const sizeIds = [
    "6626d98562525031a6a3d1db",
    "6626d98562525031a6a3d1dc",
    "6626d98562525031a6a3d1dd",
    "6626d98562525031a6a3d1de",
    "6626d98562525031a6a3d1df",
    "6626d98562525031a6a3d1e0",
    "6626d98562525031a6a3d1e1"
  ]


console.log(sizeIds.length)
console.log("haha")

  return (
    <div>
{/*         <Togglesize /> */}

    <h1>haha</h1>
{/* {    for (let i = 0; i < sizeIds.length; i++)
      return( )
    
    } */}
    
    {sizeIds.map((sizeId)=>{
      return(
        <>
        <h1>{sizeId}</h1>
        </>
      )

    })}

    <h1>{sizeIds[0]}</h1>

{/*     {
      for(const sizeId of sizeIds){
        return(
          <>
          {sizeId}
          </>
        )
      }
    } */}

    </div>
  )
}

export default page