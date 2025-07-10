import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context/Context";

const Header = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = UrlState();

  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img src="./logo.png" alt="logo" className="h-16" />
      </Link>
      {!isAuthenticated ? (
        <Button onClick={() => navigate("/auth")} className="bg-white text-black">Login</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 space-y-2">
            <DropdownMenuLabel>Jayesh Bhalala</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-[#7e8a9c] ">
              <LinkIcon />
              <span>My Links</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-red-500 text-white rounded hover:bg-gradient-to-r from-red-500 to-red-700 transition duration-300">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default Header;
