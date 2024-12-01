import { useMatches } from "react-router";
interface Meta {
  title: string;
  icon?: string;
}
export const useRouteMeta = (): Meta => {
  const matches = useMatches();
  const currentMeta = matches[matches.length - 1].handle as Meta;
  return currentMeta;
};
