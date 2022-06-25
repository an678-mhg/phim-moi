import { useLocation } from "react-router-dom";

export const useSearchParams = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  return searchParams;
};
