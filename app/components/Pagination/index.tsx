import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";
import type { IRadio } from "app/types/interfaces/IRadio";
import { useContextSelector } from "use-context-selector";
import { RadiosContext } from "app/context/RadioContext";

interface PaginationProps {
  radios: IRadio[];
  page: number;
  setPage: (page: number) => void;
  isFavorites?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  radios,
  page,
  setPage,
  isFavorites = false,
}) => {
  const fetchRadios = useContextSelector(
    RadiosContext,
    (context) => context.fetchRadios
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!isFavorites && fetchRadios) {
      fetchRadios("", "", value);
    }
  };

  return (
    <Stack spacing={2} className="my-4 mx-2 bg-project-gray-card">
      <MuiPagination
        count={isFavorites ? Math.ceil(radios.length / 10) : page + 1}
        page={page}
        onChange={handleChange}
        variant="outlined"
        color="standard"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        size="large"
        showFirstButton
        showLastButton
        sx={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          padding: '8px',
        }}
      />
    </Stack>
  );
};
