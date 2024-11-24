// interface for a dropdown item
export interface DropdownItem {
  label: string;
  value: string;
}

export type DropDownData = Array<string | DropdownItem>;
