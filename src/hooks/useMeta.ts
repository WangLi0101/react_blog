import { useMatches } from "react-router";

export const useRouteMeta = () => {
  const matches = useMatches();
  const currentMeta = matches[matches.length - 1].handle;
  return currentMeta;
};
