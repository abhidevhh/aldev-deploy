import * as YAML from "yaml";
import { z } from "zod";
import { b as cachified, c as cache } from "./cache.server-BtbXQaCP.js";
import { a as downloadFile, g as getGitHubContentPath } from "./github.server-u_4PqFTT.js";
const resumeLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  includeInPrint: z.boolean().optional()
});
const resumeSectionSchema = z.object({
  short: z.array(z.string()),
  long: z.array(z.string())
});
const resumeExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  dates: z.string(),
  context: z.string(),
  bullets: resumeSectionSchema
});
const resumeProjectSchema = z.object({
  name: z.string(),
  description: z.string()
});
const resumeEducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  year: z.string()
});
const resumeDataSchema = z.object({
  header: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    links: z.array(resumeLinkSchema)
  }),
  summary: resumeSectionSchema,
  publicWork: resumeSectionSchema,
  experienceLong: z.array(resumeExperienceSchema),
  experienceShort: z.array(resumeExperienceSchema),
  projects: z.array(resumeProjectSchema),
  skills: z.array(z.string()),
  education: z.array(resumeEducationSchema),
  recognition: resumeSectionSchema.optional(),
  recognitionByLength: resumeSectionSchema.optional()
});
async function getResumeData({
  request,
  forceFresh,
  timings
}) {
  const key = "content:data:resume.yml";
  try {
    return await cachified({
      cache,
      request,
      timings,
      key,
      ttl: 1e3 * 60 * 60 * 24 * 14,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      forceFresh,
      getFreshValue: async () => {
        const resumeString = await downloadFile(
          getGitHubContentPath("data/resume.yml")
        );
        const parsed = YAML.parse(resumeString);
        const result = resumeDataSchema.safeParse(parsed);
        if (!result.success) {
          console.error("Resume data is invalid", result.error.flatten());
          throw new Error("Resume data is invalid.");
        }
        return result.data;
      },
      checkValue: (value) => resumeDataSchema.safeParse(value).success
    });
  } catch (error) {
    console.error(`resume: failed to load resume data, returning null`, error);
    return null;
  }
}
export {
  getResumeData as g
};
