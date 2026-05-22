import { cachified, verboseReporter } from "@epic-web/cachified";
import slugify from "@sindresorhus/slugify";
import * as YAML from "yaml";
import { d as shouldForceFresh, c as cache } from "./cache.server-BtbXQaCP.js";
import { a as downloadFile, g as getGitHubContentPath } from "./github.server-u_4PqFTT.js";
import { B as typedBoolean, i as getErrorMessage } from "./misc-CQO4K9rH.js";
const isUnknownObj = (v) => typeof v === "object" && v !== null;
function getValueWithFallback(obj, key, {
  fallback,
  warnOnFallback = true,
  validateType
}) {
  const value = obj[key];
  if (validateType(value)) {
    return value;
  } else if (typeof fallback === "undefined") {
    throw new Error(
      `${key} is not set properly and no fallback is provided. It's ${typeof value}`
    );
  } else {
    if (warnOnFallback) console.warn(`Had to use fallback`, { obj, key, value });
    return fallback;
  }
}
const isString = (v) => typeof v === "string";
const hasStringId = (v) => isUnknownObj(v) && isString(v.id);
function normalizePeople(people) {
  return people.filter(isUnknownObj).map(mapPerson).filter(typedBoolean);
}
function mapPerson(rawPerson) {
  try {
    const name = getValueWithFallback(rawPerson, "name", {
      fallback: "Unnamed",
      validateType: isString
    });
    const id = getValueWithFallback(rawPerson, "id", {
      fallback: slugify(name),
      validateType: isString
    });
    return {
      id,
      name,
      cloudinaryId: getValueWithFallback(rawPerson, "cloudinaryId", {
        fallback: "abhidev.com/illustrations/abhiBuddy/abhiBuddy_profile_gray",
        validateType: isString
      }),
      role: getValueWithFallback(rawPerson, "role", {
        fallback: "Unknown",
        validateType: isString
      }),
      description: getValueWithFallback(rawPerson, "description", {
        fallback: "Being awesome",
        validateType: isString
      }),
      github: getValueWithFallback(rawPerson, "github", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      x: getValueWithFallback(rawPerson, "x", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      website: getValueWithFallback(rawPerson, "website", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      dribbble: getValueWithFallback(rawPerson, "dribbble", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      linkedin: getValueWithFallback(rawPerson, "linkedin", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      instagram: getValueWithFallback(rawPerson, "instagram", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      codepen: getValueWithFallback(rawPerson, "codepen", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      twitch: getValueWithFallback(rawPerson, "twitch", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      }),
      behance: getValueWithFallback(rawPerson, "behance", {
        fallback: null,
        warnOnFallback: false,
        validateType: isString
      })
    };
  } catch (error) {
    console.error(getErrorMessage(error), rawPerson);
    return null;
  }
}
async function getPeople({
  request,
  forceFresh
}) {
  const key = "content:data:credits.yml";
  try {
    const allPeople = await cachified(
      {
        key,
        cache,
        forceFresh: await shouldForceFresh({ forceFresh, request, key }),
        ttl: 1e3 * 60 * 60 * 24 * 30,
        staleWhileRevalidate: 1e3 * 60 * 60 * 24,
        getFreshValue: async () => {
          const creditsString = await downloadFile(
            getGitHubContentPath("data/credits.yml")
          );
          const rawCredits = YAML.parse(creditsString);
          if (!Array.isArray(rawCredits)) {
            console.error("Credits is not an array", rawCredits);
            throw new Error("Credits is not an array.");
          }
          return normalizePeople(rawCredits);
        },
        checkValue: (value) => Array.isArray(value) && value.every(hasStringId)
      },
      verboseReporter()
    );
    return normalizePeople(allPeople);
  } catch (error) {
    console.error(
      `credits: failed to load credits, returning empty fallback`,
      error
    );
    return [];
  }
}
export {
  getPeople as g
};
