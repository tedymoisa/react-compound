import React, { forwardRef } from "react";

import { useActiveTab } from "./Tabs";
import { cn } from "../utils/cn";

/**
 * Props for a tab panel.
 * @public
 */
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value this panel corresponds to. */
  value: string;
}

/**
 * A tab panel. Renders with role="tabpanel".
 * It is hidden when its value is not the active tab.
 * @public
 */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const active = useActiveTab();
    const open = active === value;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`rc-tab-panel-${value}`}
        aria-labelledby={`rc-tab-${value}`}
        hidden={!open}
        data-state={open ? "active" : "inactive"}
        className={cn("rc-tabs-content mt-3", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = "TabsContent";
