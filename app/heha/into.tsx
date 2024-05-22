"use client";
import { getAllSize } from "@/lib/database/actions/sizes.action";
import { Bold, Italic, Underline } from "lucide-react";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { handleError } from "@/lib/utils";
import { ISize } from "@/lib/database/models/size.model";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Togglesize() {
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [showValue, setShowValue] = useState<string[]>([]);
  const [gender, setGender] = useState<string>(""); // Assuming gender is a string
  const [showFoot, setShowFoot] = useState(false)
  const [showEu, setShowEU] = useState(true)
  const [showUS, setShowUS] = useState(false)
  const [showUK, setShowUK] = useState(false)
  const [showValueFor, setShowValueFor] = useState()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const sizeData = await getAllSize();
        setSizes(sizeData);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selectedSize = sizes.find((size) => size.gende === gender);
    // If the size object is found, update showValue with its value array
    if (selectedSize) {
      setShowValue(selectedSize.value);
    } else {
      // If no size object is found for the selected gender, set showValue to an empty array
      setShowValue([]);
    }
  }, [gender, sizes]);
  console.log(showValue);
  return (
    <>
      {/* Buttons to toggle gender */}
      {/*       <Button onClick={() => setGender("Male")}>Male</Button>
      <Button onClick={() => setGender("Female")}>Female</Button>
 */}

      <Button>Foot Length</Button>
      <Button onClick={()=>setShowValueFor(`UK`)}>EU</Button>
      <Button onClick={()=>{
        setShowUK(false);
        setShowEU(false);
        setShowUS(true);
        setShowFoot(false);
      }}>US</Button>
      <Button>UK</Button>

      <ToggleGroup variant="outline" type="multiple">
        {showValue?.map((value, idx) => {
          const ava = showValueFor
          return (
            <ToggleGroupItem value={value.EU} aria-label="Toggle bold">
              <div key={idx}>{value.ava}</div>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      <Button onClick={() => setGender("Male")}> Male</Button>
      <Button onClick={() => setGender("Female")}> Female</Button>

      {/*       {sizes?.map((size: any, idx: any) => {
        return (
          <div className=" flex flex-row w-full gap-4" key={idx}>
            <Button
              onClick={() => {
                setShowValue(`${size.gender}`);
              }}
            >
              {size.gender}
            </Button>

            <div>
              {size.gender === showValue &&
                size.value.map((sValue: any, id: any) => {
                  return (
                    <div key={id}>
                      <Button
                        onClick={() => {
                          setShowValueFor("footLength");
                        }}
                      >
                        {" "}
                        Foot Length{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowValueFor("EU");
                        }}
                      >
                        {" "}
                        Eur{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowValueFor("US");
                        }}
                      >
                        {" "}
                        US{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowValueFor("UK");
                        }}
                      >
                        {" "}
                        UK{" "}
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })} */}

      {/*       <Button onClick={() => setShowValueFor("EU")}> EU </Button>
      <Button onClick={() => setShowValueFor("footLength")}>
        {" "}
        Foot Length{" "}
      </Button>
      <Button onClick={() => setShowValueFor("US")}> US </Button>
      <Button onClick={() => setShowValueFor("UK")}> UK </Button>
 */}

      {/*       {sizes?.map((size) => {
        return (
          <>
{            <Button
              onClick={() => {
                setShowValue(`${size.gender}`);
              }}
            >
              {" "}
              {size.gender}{" "}
              {size.value.EU}
            </Button>}

            <div>

                {size.gender === showValue &&
                  size.value.map((value, idx) => {
                    return(
                      <>
                      <Button 
                      onClick={()=> value.EU}
                      >
                        Eu
                      </Button>
                      </>
                    )
                    return (
                      <div key={idx}>
                      {}
                          <Button> {value.EU} </Button>
                      
                      </div>
                    );
                  })}
            </div>
          </>
        );
      })}
 */}

      {}

      <ToggleGroup variant="outline" type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
