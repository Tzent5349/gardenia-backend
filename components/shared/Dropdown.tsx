import { startTransition, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { FormControl } from "../ui/form";

import { ICategory } from "@/lib/database/models/category.model";
import { IBrand } from "@/lib/database/models/brand.model";
import { IColor } from "@/lib/database/models/color.model";
import { IGender } from "@/lib/database/models/gender.model";

import {
  createCategory,
  getAllCategory,
} from "@/lib/database/actions/categories.action";
import { createBrand, getAllBrand } from "@/lib/database/actions/brands.action";
import { createColor, getAllColor } from "@/lib/database/actions/colors.action";
import { createGender, getAllGender } from "@/lib/database/actions/genders.action";
import { HexColorPicker } from "react-colorful";

type DropdownProps = {
  type: "category" | "brand" | "color" |"gender";
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler, type }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImg, setNewCategoryImg] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState("");
  const [newCategoryChildren, setNewCategoryChildren] = useState([""]);
  const [newCategoryType, setNewCategoryType] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [newCategoryStatus, setNewCategoryStatus] = useState("");

  const [brands, setBrands] = useState<IBrand[]>([]);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandLogo, setNewBrandLogo] = useState("");
  const [newBrandDescription, setNewBrandDescription] = useState("");
  const [newBrandStatus, setNewBrandStatus] = useState("");

  const [colors, setColors] = useState<IColor[]>([]);
  const [newColor, setNewColor] = useState("");
  const [newColorValue, setNewColorValue] = useState("");

  const [genders, setGenders] = useState<IGender[]>([]);
  const [newGender, setNewGender] = useState("");

  const handleAddCategory = () => {
    createCategory({
      category: {
        name: newCategoryName.trim(),
        img: newCategoryImg.trim(),
        parent: newCategoryParent.trim(),
        children: newCategoryChildren.map((child) => child.trim()),
        productType: newCategoryType.trim(),
        description: newCategoryDesc.trim(),
        status: newCategoryStatus.trim(),
      },
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  const handleAddBrand = () => {
    createBrand({
      brand: {
        name: newBrandName.trim(),
        logo: newBrandLogo.trim(),
        description: newBrandDescription.trim(),
        status: newBrandStatus.trim(),
      },
    }).then((brand) => {
      setBrands((prevState) => [...prevState, brand]);
    });
  };

  const handleAddColor = () => {
    createColor({
      color: {
        name: newColor.trim(),
        value: newColorValue.trim(),
      },
    }).then((color) => {
      setColors((prevState) => [...prevState, color]);
    });
  };

  const handleAddGender = () => {
    createGender({
      gender:{
        name: newGender.trim(),
      }
    }).then((gender)=>{
      setGenders((prevState)=> [...prevState, gender]);
    })
  }

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategory();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    const getBrands = async () => {
      const brandList = await getAllBrand();

      brandList && setBrands(brandList as IBrand[]);
    };

    const getColors = async () => {
      const colorList = await getAllColor();

      colorList && setColors(colorList as IColor[]);
    };

    const getGenders = async () => {
      const genderList = await getAllGender();
      genderList && setGenders(genderList as IGender[]);
    }
    getCategories();
    getBrands();
    getColors();
    getGenders();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field h-fit">
        <SelectValue placeholder={`${type}`} />
      </SelectTrigger>
      {type === "category" && (
        <SelectContent>
          {categories.length > 0 &&
            categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category._id}
                className="select-item p-regular-14"
              >
                {category.name}
              </SelectItem>
            ))}

          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new category
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Category name"
                    className="input-field mt-3"
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Category Image"
                    className="input-field mt-3"
                    onChange={(e) => setNewCategoryImg(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Category Parent"
                    className="input-field mt-3"
                    onChange={(e) => setNewCategoryParent(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Category Children"
                    className="input-field mt-3"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const newArray = newValue.split(",");
                      const trimmedArray = newArray.map((item) => item.trim());
                      setNewCategoryChildren(trimmedArray);
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Category type"
                    className="input-field mt-3"
                    onChange={(e) => setNewCategoryType(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Category description"
                    className="input-field mt-3"
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                  />
                  <Select
                    onValueChange={(value) => setNewCategoryStatus(value || "")}
                    defaultValue={value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Show">Show</SelectItem>
                      <SelectItem value="Hide">Hide</SelectItem>
                    </SelectContent>
                  </Select>            
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddCategory)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      )}

      {type === "brand" && (
        <SelectContent>
          {brands.length > 0 &&
            brands.map((brand) => (
              <SelectItem
                key={brand._id}
                value={brand._id}
                className="select-item p-regular-14"
              >
                {brand.name}
              </SelectItem>
            ))}

          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new Brand
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Brand</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Brand name"
                    className="input-field mt-3"
                    onChange={(e) => setNewBrandName(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Brand logo"
                    className="input-field mt-3"
                    onChange={(e) => setNewBrandLogo(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Brand description"
                    className="input-field mt-3"
                    onChange={(e) => setNewBrandDescription(e.target.value)}
                  />
                  <Select
                    onValueChange={(value) => setNewBrandStatus(value || "")}
                    defaultValue={value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for your Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddBrand)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      )}

      {type === "color" && (
        <SelectContent className="text-center">
          {colors.length > 0 &&
            colors.map((color) => (
              <SelectItem key={color._id} value={color._id}>
                <div
                  className="border p-4 rounded-full"
                  style={{ backgroundColor: color.value }}
                ></div>
                {color.name}
              </SelectItem>
            ))}

          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full justify-center rounded-sm py-3  text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new color
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Color</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Color Name"
                    className="input-field mt-3"
                    onChange={(e) => setNewColor(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Color"
                    className="input-field mt-3"
                    onChange={(e) => setNewColorValue(e.target.value)}
                    value={newColorValue}
                  />
                  <div
                    className="border p-4 rounded-full"
                    style={{ backgroundColor: newColorValue }}
                  />
                  <HexColorPicker
                    color={value}
                    onChange={(value) => setNewColorValue(value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddColor)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      )}

{type === "gender" && (
        <SelectContent>
          {genders.length > 0 &&
            genders.map((gender) => (
              <SelectItem
                key={gender._id}
                value={gender._id}
                className="select-item p-regular-14"
              >
                {gender.name}
              </SelectItem>
            ))}

          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new Gender
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Gender</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Gender name"
                    className="input-field mt-3"
                    onChange={(e) => setNewGender(e.target.value)}
                  />

                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddGender)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      )}
      
    </Select>
  );
};

export default Dropdown;
