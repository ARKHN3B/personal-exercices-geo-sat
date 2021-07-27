import { useState } from "react";
import {useMount}   from "hooks/global/useMount";

/**
 * Tells when the app has mounted, not whether the app is mounted.
 */
export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState<boolean|null>(null);

  useMount(() => {
    setHasMounted(true);
  });

  return !!hasMounted;
}
