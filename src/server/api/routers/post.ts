import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { jobPostFull, jobPostNoParse, LLMReturn } from "~/server/ml/job_post_schema";
import { predictFraudulentJob } from "~/server/ml/predictor";

export const formRouter = createTRPCRouter({
  reformat: publicProcedure
    .input(z.object({ aboutTheJob: z.string() }))
    .mutation(async ({ input }) => {
      
      const mod = await import("~/server/ml/parser");
      const res = await mod.extractJobFieldsWithLLM(input.aboutTheJob);
      return res;
    }),
  predict: publicProcedure
    .input(z.object({
      jobPostNoParse: jobPostNoParse,
      LLMReturn: LLMReturn,
    }))
    .mutation(async ({ input }) => {
      
      // make the full job post object
      const fullJobPost: z.infer<typeof jobPostFull> = jobPostFull.parse({
        ...input.jobPostNoParse,
        ...input.LLMReturn,
      });

      // pass it to the fastAPI ML model for prediction
      const result = await predictFraudulentJob(fullJobPost);

      // Mocked response for now
      return result;
    }),
});
