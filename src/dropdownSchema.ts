import { z } from 'zod';

// schema for DropdownItem
const DropdownItemSchema = z.object({
  label: z.string(),
  value: z.string(),
});

// schema for DropDownData, it can be array of strings or dropdownitem
export const DropDownDataSchema = z.array(z.union([z.string(), DropdownItemSchema]));
