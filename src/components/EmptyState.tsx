import React from "react";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  searchTerm?: string;
  isFilterActive?: boolean;
}

const EmptyState = ({
  title = "No results found",
  message = "We couldn't find any programs matching your criteria.",
  icon = <Search className="w-16 h-16 text-muted-foreground/50" />,
  actionLabel = "Clear filters",
  onAction = () => {},
  searchTerm = "",
  isFilterActive = false,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] p-8 bg-background rounded-lg border border-border shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-md">
        <div className="p-4 bg-muted/30 rounded-full">{icon}</div>

        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

        <p className="text-muted-foreground">
          {searchTerm ? (
            <>
              No programs match the search term{" "}
              <span className="font-medium">'{searchTerm}'</span>.
            </>
          ) : (
            message
          )}
        </p>

        {isFilterActive && (
          <Button onClick={onAction} variant="outline" className="mt-2">
            <RefreshCw className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
