import { UrlState } from "@/context/Context";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import * as yup from "yup";

const CreateLink = () => {
  const { user } = UrlState();

  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup.string().url("Must be Valid URl").required("URL is required"),
    customUrl: yup.string(),
  });

  const handelChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <Dialog>
        <DialogOverlay className="bg-[#010B1F]/60 backdrop-blur-sm fixed inset-0 z-40" />
        <DialogTrigger>
          <Button variants="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className={"sm:max-w-md bg-[#010B1F]"}>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>

            <Input
              id="title"
              placeholder="Short Link's Title"
              value={formValues.title}
              onChange={handelChange}
            />
            <Error message={"some Error"} />

            <Input
              id="longUrl"
              placeholder="Enter Your Long Url"
              value={formValues.longUrl}
              onChange={handelChange}
            />
            <Error message={"some Error"} />

            <div className="flex items-center gap-2">
              <Card className="p-2">trimrr.in</Card> /
              <Input id="customUrl" placeholder="Custom Link (optional)" value={formValues.customUrl} onChange={handelChange} />
            </div>
            <Error message={"some Error"} />

          </DialogHeader>
          <DialogFooter>
            <Button variants="default">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
