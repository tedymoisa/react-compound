import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

/**
 * Unique identifier for a tab value.
 * @public
 */
export type TabValue = string;

type TabsContextValue = {
  value: TabValue | null;
  setValue: (v: TabValue) => void;
  activationMode: "auto" | "manual";
};

const TabsCtx = createContext<TabsContextValue | null>(null);

function useTabsCtx() {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("Tabs context is missing. Wrap with <Tabs>.");
  return ctx;
}

/**
 * Props for the Tabs root.
 * @public
 */
export interface TabsProps {
  /**
   * Controlled active tab value. If provided, component is controlled.
   */
  value?: TabValue | null;
  /**
   * Uncontrolled initial tab value.
   */
  defaultValue?: TabValue | null;
  /**
   * Called when the active tab changes.
   */
  onValueChange?: (value: TabValue) => void;
  /**
   * How tabs get activated when focused via keyboard:
   * - "auto": focus activates the tab
   * - "manual": requires Enter/Space to activate
   * @defaultValue "auto"
   */
  activationMode?: "auto" | "manual";
  /**
   * Optional class name for the root element.
   */
  className?: string;
  /**
   * Children: typically <TabsList> and multiple <TabsContent>.
   */
  children: React.ReactNode;
}

/**
 * Tabs root providing context for the list, triggers, and content.
 * @public
 */
export function Tabs({
  value,
  defaultValue = null,
  onValueChange,
  activationMode = "auto",
  className,
  children,
}: TabsProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState<TabValue | null>(defaultValue);
  const active = controlled ? (value ?? null) : internal;

  const setValue = useCallback(
    (nextValue: TabValue) => {
      if (controlled) {
        onValueChange?.(nextValue);
      } else {
        setInternal(nextValue);
        onValueChange?.(nextValue);
      }
    },
    [controlled, onValueChange],
  );

  const ctx = useMemo<TabsContextValue>(
    () => ({ value: active, setValue, activationMode }),
    [active, setValue, activationMode],
  );

  return (
    <div className={className} data-ui="tabs">
      <TabsCtx.Provider value={ctx}>{children}</TabsCtx.Provider>
    </div>
  );
}

/**
 * Hook to read the current active tab value.
 * @public
 */
export function useActiveTab() {
  return useTabsCtx().value;
}

/**
 * Hook to activate a tab by value.
 * @public
 */
export function useSetActiveTab() {
  return useTabsCtx().setValue;
}

/**
 * For internal use by Triggers to know activation mode.
 * @public
 */
export function useTabsActivationMode() {
  return useTabsCtx().activationMode;
}
