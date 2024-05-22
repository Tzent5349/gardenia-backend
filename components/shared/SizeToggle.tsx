"use client";
import { getAllSize } from "@/lib/database/actions/sizes.action";
import { Bold, Italic, Underline } from "lucide-react";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { handleError } from "@/lib/utils";
import { ISize } from "@/lib/database/models/size.model";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getGenderById } from "@/lib/database/actions/genders.action";

type SizeToggleProps = {
  value?: string[];
  gender?: string;
  onChangeHandler?: (value: string[]) => void;
};

export function Togglesize({ value, onChangeHandler,gender }: SizeToggleProps) {
  
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [showValueFor, setShowValueFor] = useState("EU");
  console.log(gender)
  /*
  useEffect(() => {
    
 
     const fetchData = async () => {
      try {
        
        const getSize = await getAllSize();
        const sizeData = getSize.gender === genderx

        setSizes(sizeData);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []); */

  useEffect(() => {

const fetchGender = async(genderId:string)=>{
  try {
    const fetchedGender = await getGenderById(genderId);
    return fetchedGender.name
  } catch (error) {
    console.log(error);
  }
}

    const fetchData = async () => {
      try {
        const fetchedSizes = await getAllSize();

        if (gender) {
          console.log("hehe"+gender)
          const fetchedGender = await fetchGender(gender);
          const filteredSizes = fetchedSizes.filter((size:any) => size.gender === fetchedGender);
          setSizes(filteredSizes);
        } else {
          setSizes(fetchedSizes);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, [gender]);



  {console.log(sizes)}
  return (
    <>
      <div className="flex w-fit gap-4">
        <Button variant="link" type="button" className={showValueFor==="footLength" ? "underline text-red-400": "" } onClick={() => setShowValueFor(`footLength`)}>
          Foot Length
        </Button>
        <Button variant="link" type="button"  className={showValueFor==="EU" ? "underline text-red-400": "" } onClick={() => setShowValueFor(`EU`)}>EU</Button>
        <Button variant="link" type="button" className={showValueFor==="US" ? "underline text-red-400": "" } 
          onClick={() => {
            setShowValueFor(`US`);
          }}
        >
          US
        </Button>
        <Button variant="link" type="button" className={showValueFor==="UK" ? "underline text-red-400": "" } 
          onClick={() => {
            setShowValueFor(`UK`);
          }}
        >
          UK
        </Button>
      </div>

      <ToggleGroup
        variant="outline"
        type="multiple"
        onValueChange={onChangeHandler}
        defaultValue={value}
      >
        {sizes?.map((size, idx) => {
          return size.value.map((value, idx) => {
            if (showValueFor === "EU") {
              return (
                <ToggleGroupItem
                  value={value._id}
                  key={idx}
                >
                  <div>
                    <h1> {value.EU} </h1>
                  </div>
                </ToggleGroupItem>
              );
            } else if (showValueFor === "US") {
              return (
                <ToggleGroupItem
                  value={value._id}
                  key={idx}
                >
                  <div>
                    <h1> {value.US} </h1>
                  </div>
                </ToggleGroupItem>
              );
            } else if (showValueFor === "UK") {
              return (
                <ToggleGroupItem
                  value={value._id}
                  key={idx}
                >
                  <div>
                    <h1> {value.UK} </h1>
                  </div>
                </ToggleGroupItem>
              );
            } else if (showValueFor === "footLength") {
              return (
                <ToggleGroupItem
                  value={value._id}
                  key={idx}
                >
                  <div>
                    <h1> {value.footLength} </h1>
                  </div>
                </ToggleGroupItem>
              );
            }
          });
        })}
      </ToggleGroup>
    </>
  );
}
