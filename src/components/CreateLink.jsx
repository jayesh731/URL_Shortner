import { UrlState } from "@/context/Context";
import React, { useEffect, useRef, useState } from "react";
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
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrls } from "@/db/apiUrls";
import { ClipLoader } from "react-spinners";

const CreateLink = () => {
  const ref = useRef();
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
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handelChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrls, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Dialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <DialogOverlay className="bg-[#010B1F]/60 backdrop-blur-sm fixed inset-0 z-40" />
        <DialogTrigger asChild>
          <Button variants="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className={"sm:max-w-md bg-[#010B1F]"}>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          {formValues?.longUrl && (
            <QRCode value={formValues?.longUrl} size={200} ref={ref} />
          )}
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handelChange}
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter Your Long Url"
            value={formValues.longUrl}
            onChange={handelChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="p-2">trimrr.in</Card> /
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handelChange}
            />
          </div>
          {error && <Error message={errors.message} />}
          <DialogFooter>
            <Button
              // disabled={loading}
              onClick={createNewLink}
              variants="default"
            >
              {loading ? <ClipLoader size={17} color="#36d7b7" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
