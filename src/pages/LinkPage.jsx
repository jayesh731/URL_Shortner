import DeviceStats from "@/components/DeviceStates";
import LocationStates from "@/components/LocationStates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context/Context";
import { getClicksforUrl } from "@/db/apiClick";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import downloadImage from "@/hooks/useDownload";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";


const LinkPage = () => {
  // const downloadImage = () => {
  //   const imageUrl = url?.qr;
  //   const fileName = url?.title;

  //   const anchor = document.createElement("a");
  //   anchor.href = imageUrl;
  //   anchor.download = fileName;

  //   document.body.appendChild(anchor);

  //   anchor.click();

  //   document.body.removeChild(anchor);
  // };

  const { id } = useParams();
  const { user } = UrlState();

  const navigate = useNavigate();

  const {
    loading,
    data: url,
    error,
    fn,
  } = useFetch(getUrl, {
    id,
    user_id: user?.id,
  });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksforUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <>
      {(loading || loadingStats || loadingDelete) && (
        <BarLoader className="mb-4" width={"100%"} color="#37d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://trimrr.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://trimrr.in/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="Ghost"
              onClick={() =>
                navigator.clipboard.writeText(`https://trimrr.in/${link}`)
              }
            >
              <Copy />
            </Button>
            <Button variant="Ghost" onClick={() => downloadImage(url)}>
              <Download />
            </Button>
            <Button
              variant="Ghost"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationStates stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Laoding statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
