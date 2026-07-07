export type DbServiceCategory = "ozone" | "dry_cleaning";

// Admin routes use "dry-cleaning" (matches the existing /admin/dry-cleaning
// leads route) while the database enum uses "dry_cleaning".
export const CATEGORY_FROM_SEGMENT: Record<string, DbServiceCategory> = {
  ozone: "ozone",
  "dry-cleaning": "dry_cleaning",
};

export const SEGMENT_FROM_CATEGORY: Record<DbServiceCategory, string> = {
  ozone: "ozone",
  dry_cleaning: "dry-cleaning",
};

export const CATEGORY_LABEL: Record<DbServiceCategory, string> = {
  ozone: "Озонування",
  dry_cleaning: "Хімчистка меблів",
};
