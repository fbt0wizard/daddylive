import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Clock, Calendar, Tv, Info, Star, Share2, Heart } from "lucide-react";

interface ProgramDetailsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  channelName?: string;
  channelLogo?: string;
  startTime?: string;
  endTime?: string;
  category?: string;
  date?: string;
  description?: string;
  rating?: number;
  cast?: string[];
  director?: string;
  year?: string;
  imageUrl?: string;
}

const ProgramDetails = ({
  open = true,
  onOpenChange = () => {},
  title = "Program Title",
  channelName = "Channel Name",
  channelLogo = "https://api.dicebear.com/7.x/avataaars/svg?seed=channel",
  startTime = "20:00",
  endTime = "21:00",
  category = "Entertainment",
  date = "Today",
  description = "This is a detailed program description. It provides comprehensive information about what the program is about, including plot details, themes, and other relevant information that viewers might want to know before watching.",
  rating = 4.5,
  cast = ["Actor One", "Actor Two", "Actor Three"],
  director = "Director Name",
  year = "2023",
  imageUrl = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&q=80",
}: ProgramDetailsProps) => {
  // Generate stars based on rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white p-0 overflow-hidden">
        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div>
              <Badge className="mb-2 bg-blue-600 hover:bg-blue-700">
                {category}
              </Badge>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1 flex items-center justify-center border border-gray-200">
                  <img
                    src={channelLogo}
                    alt={channelName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <DialogTitle className="text-xl">{channelName}</DialogTitle>
              </div>
              <div className="flex space-x-1">
                {[...Array(fullStars)].map((_, i) => (
                  <Star
                    key={`full-${i}`}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {hasHalfStar && (
                  <Star
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-2">
              <DialogDescription className="text-gray-700 mb-4">
                {description}
              </DialogDescription>

              <div className="space-y-2">
                {director && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">
                      Director:{" "}
                    </span>
                    <span className="text-gray-600">{director}</span>
                  </div>
                )}
                {cast && cast.length > 0 && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Cast: </span>
                    <span className="text-gray-600">{cast.join(", ")}</span>
                  </div>
                )}
                {year && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Year: </span>
                    <span className="text-gray-600">{year}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Program Info
              </h4>
              <Separator />
              <div className="flex items-center text-sm text-gray-700">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span>
                  {startTime} - {endTime}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span>{date}</span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Tv className="w-4 h-4 mr-2 text-gray-500" />
                <span>Live TV</span>
              </div>

              <div className="mt-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  Program progress
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center border-t pt-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Favorite</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Watch Now</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetails;
