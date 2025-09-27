import React, { forwardRef } from "react";

import { cn } from "../../utils/cn";

/**
 * Props for the container of tab triggers.
 * @public
 */
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Container for tab triggers. Renders with role="tablist".
 * @public
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          "rc-tabs-list inline-flex items-center gap-1 rounded-md bg-gray-100 p-1",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsList.displayName = "TabsList";
