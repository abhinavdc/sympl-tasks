import { ZodObject, ZodString, ZodNumber, ZodBoolean } from "zod";

export interface Task {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
  customFields: CustomFields;
}

export enum Priority {
  High = "high",
  Low = "low",
  Medium = "medium",
  None = "none",
  Urgent = "urgent",
}

export enum Status {
  Completed = "completed",
  InProgress = "in_progress",
  NotStarted = "not_started",
}

export interface Errors {
  title: string;
  priority: string;
  status: string;
  customFields: Record<string, string>; // Maps custom field keys to error messages
}

type CustomFieldType = "text" | "number" | "checkbox";

export interface CustomFieldDefinition {
  key: string;
  label: string;
  type: CustomFieldType;
  required: boolean;
}


export type CustomFields = Record<string, string | number | boolean>;

export type CustomFieldSchemaType = ZodObject<
  Record<string, ZodString | ZodNumber | ZodBoolean>
>;