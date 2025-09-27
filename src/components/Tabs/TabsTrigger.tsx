import React, { forwardRef } from "react";

import { cn } from "../../utils/cn";
import { useActiveTab, useSetActiveTab, useTabsActivationMode } from "./Tabs";

/**
 * Props for an individual tab trigger.
 * @public
 */
export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value this trigger activates. */
  value: string;
}

/**
 * A single tab trigger. Renders with role="tab".
 * Supports "auto" and "manual" activation modes for keyboard users.
 * @public
 */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, onFocus, onKeyDown, ...props }, ref) => {
    const active = useActiveTab();
    const setActive = useSetActiveTab();
    const mode = useTabsActivationMode();

    const selected = active === value;

    function handleFocus() {
      if (mode === "auto") setActive(value);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
      // Manual activation: activate on Enter/Space
      if (mode === "manual" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setActive(value);
      }
    }

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={selected}
        aria-controls={`rc-tab-panel-${value}`}
        data-state={selected ? "active" : "inactive"}
        tabIndex={selected ? 0 : -1}
        className={cn(
          "rc-tabs-trigger rounded-md px-3 py-1.5 text-sm font-medium",
          "text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          className,
        )}
        onFocus={(e) => {
          onFocus?.(e);
          handleFocus();
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        }}
        onClick={(e) => {
          props.onClick?.(e);
          setActive(value);
        }}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";
