import {
  PLATFORM_FILTER_OPTIONS,
  integrationFilterOptions,
  FRAMEWORK_FILTER_OPTIONS,
} from "../../utils/filter-data";
import {Page} from "../../api";
export interface SelectedFilters {
  platform?: typeof PLATFORM_FILTER_OPTIONS[number];
  framework?: typeof FRAMEWORK_FILTER_OPTIONS[number];
  integration?: typeof integrationFilterOptions[number];
}

export type SetSelectedFilters = (updates: SelectedFilters) => void;

export type SelectedTabHeadings = string[];
export type SetNewSelectedTabHeadings = (tabHeading: string) => void;

export interface PageContext {
  pageData?: Page;
  selectedFilters?: SelectedFilters;
  setSelectedFilters?: SetSelectedFilters;
  selectedTabHeadings: SelectedTabHeadings;
  setNewSelectedTabHeadings: SetNewSelectedTabHeadings;
}
