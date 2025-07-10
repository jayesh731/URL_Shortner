import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context/Context";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  // const navigate = useNavigate();

  // const { isAuthenticated, loading } = UrlState();

  // useEffect(() => {
  //   if (isAuthenticated && !loading) {
  //     navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  //   }
  // }, [isAuthenticated, loading]);

  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longLink ? "Hold up! Let's login first.." : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="data-[state=active]:bg-[#2d3165] text-white py-3"
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#2d3165] text-white"
            value="signup"
          >
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-5" value="login">
          <Login />
        </TabsContent>
        <TabsContent className="mt-5" value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
