import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ProgramGrid from "./ProgramGrid";
import ProgramDetails from "./ProgramDetails";

interface Program {
  id: string;
  title: string;
  channelName: string;
  channelLogo: string;
  startTime: string;
  endTime: string;
  category: string;
  date: string;
  description: string;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [channels, setChannels] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Mock data for development
  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://daddylive.mp/schedule/schedule-generated.json",
        );
        // Process data to extract channels and categories
        const uniqueChannels = [
          ...new Set(response.data.map((item: any) => item.channelName)),
        ].filter(Boolean);
        const uniqueCategories = [
          ...new Set(response.data.map((item: any) => item.category)),
        ].filter(Boolean);

        setChannels(uniqueChannels);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to mock data if API fails
        setChannels([
          "BBC One",
          "BBC Two",
          "ITV",
          "Channel 4",
          "Sky Sports",
          "ESPN",
          "HBO",
          "Netflix",
          "Discovery",
          "Food Network",
          "Comedy Central",
        ]);

        setCategories([
          "Sports",
          "News",
          "Entertainment",
          "Movies",
          "Documentary",
          "Drama",
          "Comedy",
          "Cooking",
          "Fantasy",
          "Business",
        ]);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleTimeZoneChange = (timezone: string) => {
    setSelectedTimeZone(timezone);
  };

  const handleChannelFilter = (channel: string) => {
    setSelectedChannel(channel);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTimeSlotFilter = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    setIsDetailsOpen(true);
  };

  const activeFilters = {
    channel: selectedChannel,
    category: selectedCategory,
    timeSlot: selectedTimeSlot,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onTimeZoneChange={handleTimeZoneChange}
        selectedTimeZone={selectedTimeZone}
      />

      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TV Program Schedule
          </h1>
          <p className="text-gray-600">
            Browse the latest TV programs across all your favorite channels.
            Current time zone:{" "}
            <span className="font-medium">{selectedTimeZone}</span>
          </p>
        </motion.div>

        <FilterBar
          onChannelFilter={handleChannelFilter}
          onCategoryFilter={handleCategoryFilter}
          onTimeSlotFilter={handleTimeSlotFilter}
          activeFilters={activeFilters}
          channels={channels}
          categories={categories}
          timeSlots={timeSlots}
        />

        <div className="mt-6">
          <ProgramGrid
            searchTerm={searchTerm}
            selectedChannel={selectedChannel}
            selectedCategory={selectedCategory}
            selectedTimeSlot={selectedTimeSlot}
            timeZone={selectedTimeZone}
          />
        </div>
      </main>

      {selectedProgram && (
        <ProgramDetails
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          title={selectedProgram.title}
          channelName={selectedProgram.channelName}
          channelLogo={selectedProgram.channelLogo}
          startTime={selectedProgram.startTime}
          endTime={selectedProgram.endTime}
          category={selectedProgram.category}
          date={selectedProgram.date}
          description={selectedProgram.description}
        />
      )}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DaddyLive TV</h3>
              <p className="text-gray-400">
                Your one-stop destination for all TV program schedules. Never
                miss your favorite shows again!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    TV Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Channels
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Categories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">Have questions or feedback?</p>
              <a
                href="mailto:info@daddylive.tv"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                info@daddylive.tv
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DaddyLive TV. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
