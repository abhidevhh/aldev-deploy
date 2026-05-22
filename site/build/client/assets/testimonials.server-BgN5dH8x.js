import slugify from "@sindresorhus/slugify";
import * as YAML from "yaml";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import pick from "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import { c as cachified, b as cache } from "./cache.server-BWnHcoUK.js";
import { d as downloadFile, g as getGitHubContentPath } from "./github.server-CeJRQaMc.js";
import { m as markdownToHtml } from "./markdown.server-C6vYtRmU.js";
import { s as typedBoolean, e as getErrorMessage } from "./misc-DM3BUXHg.js";
const allCategories = [
  "teaching",
  "react",
  "testing",
  "courses",
  "workshop",
  "community",
  "podcast",
  "youtube",
  "talk",
  "blog",
  "remix"
];
const allSubjects = [
  "EpicWeb.dev",
  "EpicReact.dev",
  "TestingJavaScript.com",
  "Discord Community",
  "Workshop",
  "Call Kent Podcast",
  "Chats with Kent Podcast",
  "YouTube Live Streams",
  "KCD Office Hours",
  "Talk",
  "Blog",
  "Frontend Masters",
  "Egghead.io",
  "workshop: react-fundamentals",
  "workshop: react-hooks",
  "workshop: advanced-react-hooks",
  "workshop: advanced-react-patterns",
  "workshop: react-performance",
  "workshop: react-suspense",
  "workshop: testing-react-apps",
  "workshop: build-an-epic-react-app",
  "workshop: testing-fundamentals",
  "workshop: testing-node-apps",
  "workshop: web-app-fundamentals-part-1",
  "workshop: web-app-fundamentals-part-2",
  "Other"
];
const categoriesBySubject = {
  "EpicWeb.dev": ["teaching", "courses", "testing", "workshop"],
  "Discord Community": ["community"],
  "EpicReact.dev": ["teaching", "courses", "react"],
  "TestingJavaScript.com": ["teaching", "courses", "testing"],
  Workshop: ["workshop"],
  "Call Kent Podcast": ["podcast"],
  "Chats with Kent Podcast": ["podcast"],
  "YouTube Live Streams": ["youtube"],
  "KCD Office Hours": ["youtube"],
  Talk: ["talk"],
  Blog: ["blog"],
  "Frontend Masters": ["courses"],
  "Egghead.io": ["courses"],
  "workshop: react-fundamentals": ["workshop", "react"],
  "workshop: react-hooks": ["workshop", "react"],
  "workshop: advanced-react-hooks": ["workshop", "react"],
  "workshop: advanced-react-patterns": ["workshop", "react"],
  "workshop: react-performance": ["workshop", "react"],
  "workshop: react-suspense": ["workshop", "react"],
  "workshop: testing-react-apps": ["workshop", "react", "testing"],
  "workshop: build-an-epic-react-app": ["workshop", "react", "testing"],
  "workshop: testing-fundamentals": ["workshop", "react", "testing"],
  "workshop: testing-node-apps": ["workshop", "react", "testing"],
  "workshop: web-app-fundamentals-part-1": ["workshop", "remix"],
  "workshop: web-app-fundamentals-part-2": ["workshop", "remix"],
  Other: []
};
function getValueWithFallback(obj, key, {
  fallback,
  warnOnFallback = true,
  validateType
}) {
  const value = obj[key];
  if (validateType(value)) {
    return value;
  } else if (typeof fallback !== "undefined") {
    if (warnOnFallback) console.warn(`Had to use fallback`, { obj, key, value });
    return fallback;
  } else {
    throw new Error(
      `${key} is not set properly and no fallback is provided. It's ${typeof value}`
    );
  }
}
const isString = (v) => typeof v === "string";
const isOneOf = (validValues) => (v) => validValues.includes(v);
const areOneOf = (validValues) => (v) => Array.isArray(v) && v.every(isOneOf(validValues));
async function mapTestimonial(rawTestimonial) {
  try {
    const link = getValueWithFallback(rawTestimonial, "link", {
      warnOnFallback: false,
      fallback: null,
      validateType: isString
    });
    const subjects = getValueWithFallback(
      rawTestimonial,
      "subjects",
      { fallback: ["Other"], validateType: areOneOf(allSubjects) }
    );
    const categories = getValueWithFallback(
      rawTestimonial,
      "categories",
      {
        warnOnFallback: false,
        fallback: Array.from(
          new Set(subjects.flatMap((s) => categoriesBySubject[s]))
        ),
        validateType: areOneOf(allCategories)
      }
    );
    const rawTestimonialContent = getValueWithFallback(
      rawTestimonial,
      "testimonial",
      { validateType: isString }
    );
    const author = getValueWithFallback(rawTestimonial, "author", {
      validateType: isString
    });
    const testimonial = {
      id: slugify(author),
      author,
      subjects,
      categories,
      link,
      priority: getValueWithFallback(rawTestimonial, "priority", {
        fallback: 0,
        validateType: isOneOf([0, 1, 2, 3, 4, 5])
      }),
      cloudinaryId: getValueWithFallback(rawTestimonial, "cloudinaryId", {
        validateType: isString
      }),
      company: getValueWithFallback(rawTestimonial, "company", {
        validateType: isString
      }),
      testimonial: await markdownToHtml(rawTestimonialContent)
    };
    return testimonial;
  } catch (error) {
    console.error(getErrorMessage(error), rawTestimonial);
    return null;
  }
}
async function getAllTestimonials({
  request,
  forceFresh,
  timings
}) {
  const key = "content:data:testimonials.yml";
  try {
    return await cachified({
      cache,
      request,
      timings,
      key,
      forceFresh,
      ttl: 1e3 * 60 * 60 * 24,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      getFreshValue: async () => {
        const talksString = await downloadFile(
          getGitHubContentPath("data/testimonials.yml")
        );
        const rawTestimonials = YAML.parse(talksString);
        if (!Array.isArray(rawTestimonials)) {
          console.error("Testimonials is not an array", rawTestimonials);
          throw new Error("Testimonials is not an array.");
        }
        return (await Promise.all(rawTestimonials.map(mapTestimonial))).filter(
          typedBoolean
        );
      },
      checkValue: (value) => Array.isArray(value)
    });
  } catch (error) {
    console.error(
      `testimonials: failed to load testimonials, returning empty fallback`,
      error
    );
    return [];
  }
}
function sortByWithPriorityWeight(a, b) {
  return a.priority * Math.random() > b.priority * Math.random() ? 1 : -1;
}
function mapOutMetadata(testimonialWithMetadata) {
  return pick(testimonialWithMetadata, [
    "id",
    "author",
    "cloudinaryId",
    "company",
    "testimonial",
    "link"
  ]);
}
async function getTestimonials({
  request,
  forceFresh,
  subjects = [],
  categories = [],
  limit,
  timings
}) {
  const allTestimonials = await getAllTestimonials({
    request,
    forceFresh,
    timings
  });
  if (!(subjects.length + categories.length)) {
    return allTestimonials.sort(sortByWithPriorityWeight).map(mapOutMetadata);
  }
  const subjectTestimonials = allTestimonials.filter(
    (testimonial) => testimonial.subjects.some((s) => subjects.includes(s))
  ).sort(sortByWithPriorityWeight);
  const fillerTestimonials = allTestimonials.filter(
    (t) => !subjectTestimonials.includes(t) && t.categories.some((c) => categories.includes(c))
  ).sort((a, b) => {
    return a.priority * Math.random() > b.priority * Math.random() ? 1 : -1;
  });
  const finalTestimonials = [...subjectTestimonials, ...fillerTestimonials];
  if (limit) {
    return finalTestimonials.slice(0, limit).map(mapOutMetadata);
  }
  return finalTestimonials.map(mapOutMetadata);
}
export {
  getTestimonials as g
};
//# sourceMappingURL=testimonials.server-BgN5dH8x.js.map
