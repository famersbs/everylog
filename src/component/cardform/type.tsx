export const DISPLAY_DATE_TIME = "YYYY/MM/DD HH:mm";

export enum InputType {
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
  TAGSELECT = "tagselect",
  DATETIME = "datetime"
}

export interface Spec {
  type: InputType;
  property_name: string;
  label: string;
  items?: Array<{
    label: string;
    value: string | number;
  }>;
  focus?: boolean;
  is_required?: boolean;
  maximum_value?: number;
}

export type FormValue = any;
export type FormValues = { [property_name: string]: FormValue };
