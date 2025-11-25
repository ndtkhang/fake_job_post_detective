import { z } from "zod";

// TODO: Edit to be all fields of the job post
export const jobPostFull = z.object({
  job_id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  description: z.string(),
});

// TODO: Everything that's not going to be passed to the LLM
export const jobPostNoParse = z.object({
  job_id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  description: z.string(),
});

// TODO: Everything that's not going to be passed to the LLM
export const jobPostParse = z.object({
  job_id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  description: z.string(),
});

// TODO: Everything that's LLM return
export const LLMReturn = z.object({
  job_id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  description: z.string(),
});