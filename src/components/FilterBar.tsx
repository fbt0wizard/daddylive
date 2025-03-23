import React, { useState } from "react";
import { Filter, Tv, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface FilterBarProps {
  onChannelFilter?: (channel: string) => void;
  onCategoryFilter?: (category: string) => void;
  onTimeSlotFilter?: (timeSlot: string) => void;
  activeFilters?: {
    channel?: string;
    category?: string;
    timeSlot?: string;
  };
  channels?: string[];
  categories?: string[];
  timeSlots?: string[];
}

const FilterBar = ({
  onChannelFilter = () => {},
  onCategoryFilter = () => {},
  onTimeSlotFilter = () => {},
  activeFilters = {},
  channels = ["BBC One", "BBC Two", "ITV", "Channel 4", "Sky Sports"],
  categories = ["Sports", "News", "Entertainment", "Movies", "Documentary"],
  timeSlots = ["Morning", "Afternoon", "Evening", "Night"],
}: FilterBarProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      // Clear all filters
      onChannelFilter("");
      onCategoryFilter("");
      onTimeSlotFilter("");
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className="w-full bg-background border-b border-border py-3 px-4 sticky top-0 z-10">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilters}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className="hidden md:flex"
          >
            <TabsList>
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="live">Live Now</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex md:hidden">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium flex items-center gap-1">
              <Tv className="h-3 w-3" /> Channel
            </label>
            <Select
              value={activeFilters.channel || ""}
              onValueChange={onChannelFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Channels</SelectItem>
                {channels.map((channel) => (
                  <SelectItem key={channel} value={channel}>
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Category
            </label>
            <Select
              value={activeFilters.category || ""}
              onValueChange={onCategoryFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" /> Time Slot
            </label>
            <Select
              value={activeFilters.timeSlot || ""}
              onValueChange={onTimeSlotFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Time Slots</SelectItem>
                {timeSlots.map((timeSlot) => (
                  <SelectItem key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FilterBar;
