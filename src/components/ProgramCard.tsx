import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Calendar, Tv } from "lucide-react";

interface ProgramCardProps {
  title?: string;
  channelName?: string;
  channelLogo?: string;
  startTime?: string;
  endTime?: string;
  category?: string;
  date?: string;
  description?: string;
  onClick?: () => void;
}

const ProgramCard = ({
  title = "Program Title",
  channelName = "Channel Name",
  channelLogo = "https://api.dicebear.com/7.x/avataaars/svg?seed=channel",
  startTime = "20:00",
  endTime = "21:00",
  category = "Entertainment",
  date = "Today",
  description = "This is a sample program description. It provides a brief overview of what the program is about.",
  onClick = () => {},
}: ProgramCardProps) => {
  // Generate a random gradient background for the card
  const gradients = [
    "from-blue-50 to-indigo-100",
    "from-purple-50 to-pink-100",
    "from-green-50 to-emerald-100",
    "from-amber-50 to-yellow-100",
    "from-sky-50 to-cyan-100",
  ];

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <Card
      className={`w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-br ${randomGradient} border-transparent hover:scale-[1.02] cursor-pointer`}
      onClick={onClick}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-1 flex items-center justify-center">
            <img
              src={channelLogo}
              alt={channelName}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-medium text-sm text-gray-700">
            {channelName}
          </span>
        </div>
        <Badge
          variant="secondary"
          className="bg-white/80 text-gray-700 hover:bg-white/90"
        >
          {category}
        </Badge>
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{description}</p>

        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            <span>
              {startTime} - {endTime}
            </span>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            <span>{date}</span>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <Tv className="w-3.5 h-3.5 mr-1.5" />
            <span>Live TV</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${Math.random() * 100}%` }}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
