import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProgramCard from "./ProgramCard";
import SkeletonLoader from "./SkeletonLoader";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import { Pagination } from "./ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface ProgramGridProps {
  searchTerm?: string;
  selectedChannel?: string;
  selectedCategory?: string;
  selectedTimeSlot?: string;
  timeZone?: string;
}

const ProgramGrid = ({
  searchTerm = "",
  selectedChannel = "",
  selectedCategory = "",
  selectedTimeSlot = "",
  timeZone = "UTC",
}: ProgramGridProps) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const programsPerPage = 12;

  // Mock data for development
  const mockPrograms: Program[] = [
    {
      id: "1",
      title: "Premier League: Arsenal vs Liverpool",
      channelName: "Sky Sports",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sky",
      startTime: "15:00",
      endTime: "17:00",
      category: "Sports",
      date: "Today",
      description:
        "Live coverage of the Premier League match between Arsenal and Liverpool at the Emirates Stadium.",
    },
    {
      id: "2",
      title: "Stranger Things",
      channelName: "Netflix",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=netflix",
      startTime: "20:00",
      endTime: "21:00",
      category: "Entertainment",
      date: "Today",
      description:
        "The kids from Hawkins continue their battle against the forces from the Upside Down.",
    },
    {
      id: "3",
      title: "World News",
      channelName: "BBC",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=bbc",
      startTime: "18:00",
      endTime: "19:00",
      category: "News",
      date: "Today",
      description:
        "The latest international news and analysis from around the globe.",
    },
    {
      id: "4",
      title: "MasterChef",
      channelName: "Food Network",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=food",
      startTime: "19:30",
      endTime: "20:30",
      category: "Cooking",
      date: "Today",
      description:
        "Amateur chefs compete in a series of challenging culinary tasks to win the title of MasterChef.",
    },
    {
      id: "5",
      title: "Planet Earth",
      channelName: "Discovery",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=discovery",
      startTime: "21:00",
      endTime: "22:00",
      category: "Documentary",
      date: "Today",
      description:
        "Explore the wonders of our natural world in this stunning documentary series.",
    },
    {
      id: "6",
      title: "Formula 1: Monaco Grand Prix",
      channelName: "ESPN",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=espn",
      startTime: "14:00",
      endTime: "16:00",
      category: "Sports",
      date: "Tomorrow",
      description:
        "Live coverage of the prestigious Monaco Grand Prix from the streets of Monte Carlo.",
    },
    {
      id: "7",
      title: "The Crown",
      channelName: "Netflix",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=netflix",
      startTime: "22:00",
      endTime: "23:00",
      category: "Drama",
      date: "Today",
      description:
        "A historical drama about the reign of Queen Elizabeth II and the events that shaped the second half of the 20th century.",
    },
    {
      id: "8",
      title: "Friends",
      channelName: "Comedy Central",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=comedy",
      startTime: "17:00",
      endTime: "18:00",
      category: "Comedy",
      date: "Today",
      description:
        "Follow the lives of six friends living in Manhattan as they navigate their way through adulthood.",
    },
    {
      id: "9",
      title: "Breaking Bad",
      channelName: "AMC",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=amc",
      startTime: "23:00",
      endTime: "00:00",
      category: "Drama",
      date: "Today",
      description:
        "A high school chemistry teacher diagnosed with cancer turns to a life of crime to secure his family's financial future.",
    },
    {
      id: "10",
      title: "NBA Finals",
      channelName: "TNT",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=tnt",
      startTime: "20:30",
      endTime: "23:00",
      category: "Sports",
      date: "Tomorrow",
      description:
        "Live coverage of the NBA Finals as the top teams battle for the championship.",
    },
    {
      id: "11",
      title: "The Great British Bake Off",
      channelName: "Channel 4",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=channel4",
      startTime: "20:00",
      endTime: "21:00",
      category: "Cooking",
      date: "Tomorrow",
      description:
        "Amateur bakers compete against each other in a series of challenges, trying to impress the judges with their baking skills.",
    },
    {
      id: "12",
      title: "Game of Thrones",
      channelName: "HBO",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=hbo",
      startTime: "21:00",
      endTime: "22:00",
      category: "Fantasy",
      date: "Tomorrow",
      description:
        "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    },
    {
      id: "13",
      title: "The Office",
      channelName: "NBC",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=nbc",
      startTime: "19:00",
      endTime: "19:30",
      category: "Comedy",
      date: "Today",
      description:
        "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    },
    {
      id: "14",
      title: "Peaky Blinders",
      channelName: "BBC",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=bbc",
      startTime: "22:00",
      endTime: "23:00",
      category: "Drama",
      date: "Tomorrow",
      description:
        "A gangster family epic set in Birmingham, England, in 1919, centered on a gang who sew razor blades in the peaks of their caps.",
    },
    {
      id: "15",
      title: "Wimbledon Tennis",
      channelName: "ESPN",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=espn",
      startTime: "13:00",
      endTime: "18:00",
      category: "Sports",
      date: "Tomorrow",
      description:
        "Live coverage of the prestigious Wimbledon tennis tournament from the All England Club in London.",
    },
    {
      id: "16",
      title: "Shark Tank",
      channelName: "ABC",
      channelLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=abc",
      startTime: "20:00",
      endTime: "21:00",
      category: "Business",
      date: "Tomorrow",
      description:
        "Aspiring entrepreneurs pitch their business ideas to a panel of investors, hoping to secure funding and mentorship.",
    },
  ];

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError(false);

      try {
        // Fetch from the actual API
        const response = await axios.get(
          "https://daddylive.mp/schedule/schedule-generated.json",
        );

        // Map the API response to our Program interface
        const formattedPrograms = response.data.map((item: any) => ({
          id: item.id || String(Math.random()),
          title: item.title || "Untitled Program",
          channelName: item.channelName || "Unknown Channel",
          channelLogo:
            item.channelLogo ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.channelName || "channel"}`,
          startTime: item.startTime || "00:00",
          endTime: item.endTime || "00:00",
          category: item.category || "Uncategorized",
          date: item.date || "Today",
          description: item.description || "No description available",
        }));

        setPrograms(formattedPrograms);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching program data:", err);
        // Fallback to mock data if API fails
        setPrograms(mockPrograms);
        setError(false); // We're providing fallback data, so no error
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Filter programs based on search term and selected filters
  useEffect(() => {
    if (programs.length === 0) return;

    let filtered = [...programs];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (program) =>
          program.title.toLowerCase().includes(term) ||
          program.channelName.toLowerCase().includes(term) ||
          program.description.toLowerCase().includes(term),
      );
    }

    // Apply channel filter
    if (selectedChannel) {
      filtered = filtered.filter(
        (program) => program.channelName === selectedChannel,
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (program) => program.category === selectedCategory,
      );
    }

    // Apply time slot filter
    if (selectedTimeSlot) {
      // This is a simplified implementation
      // In a real app, you would parse the time and do proper time comparisons
      filtered = filtered.filter((program) => {
        const [startHour] = program.startTime.split(":").map(Number);

        if (selectedTimeSlot === "morning") {
          return startHour >= 6 && startHour < 12;
        } else if (selectedTimeSlot === "afternoon") {
          return startHour >= 12 && startHour < 18;
        } else if (selectedTimeSlot === "evening") {
          return startHour >= 18 && startHour < 22;
        } else if (selectedTimeSlot === "night") {
          return startHour >= 22 || startHour < 6;
        }
        return true;
      });
    }

    setFilteredPrograms(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    programs,
    searchTerm,
    selectedChannel,
    selectedCategory,
    selectedTimeSlot,
  ]);

  // Calculate pagination
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(
    indexOfFirstProgram,
    indexOfLastProgram,
  );
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle program selection
  const handleProgramClick = (program: Program) => {
    setSelectedProgram(program);
    // In a real implementation, this would open the program details modal
    console.log("Selected program:", program);
  };

  // Handle retry when error occurs
  const handleRetry = () => {
    setLoading(true);
    setError(false);
    // Refetch data
    setTimeout(() => {
      setPrograms(mockPrograms);
      setLoading(false);
    }, 1000);
  };

  // Determine if any filters are active
  const isFilterActive = Boolean(
    searchTerm || selectedChannel || selectedCategory || selectedTimeSlot,
  );

  // Handle clearing all filters
  const handleClearFilters = () => {
    // This would be called from the EmptyState component
    // We can't directly clear filters here as they're passed as props
    // But we can log this for debugging
    console.log("Clearing all filters");

    // In a real app with state management, we would dispatch an action here
    // For now, we'll just return all programs
    setFilteredPrograms(programs);
  };

  // Render loading state
  if (loading) {
    return <SkeletonLoader count={programsPerPage} />;
  }

  // Render error state
  if (error) {
    return <ErrorState onRetry={handleRetry} />;
  }

  // Render empty state if no programs match filters
  if (filteredPrograms.length === 0) {
    return (
      <EmptyState
        searchTerm={searchTerm}
        isFilterActive={isFilterActive}
        onAction={handleClearFilters}
      />
    );
  }

  return (
    <div className="w-full bg-background p-4">
      {/* Program Grid */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentPrograms.map((program) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <ProgramCard
                  title={program.title}
                  channelName={program.channelName}
                  channelLogo={program.channelLogo}
                  startTime={program.startTime}
                  endTime={program.endTime}
                  category={program.category}
                  date={program.date}
                  description={program.description}
                  onClick={() => handleProgramClick(program)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`w-8 h-8 ${currentPage === page ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramGrid;
