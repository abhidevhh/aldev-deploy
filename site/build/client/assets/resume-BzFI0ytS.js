import { UNSAFE_withComponentProps, useSearchParams, Link, data } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { B as ButtonLink } from "./button-B-8RrXF2.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { b as H4, P as Paragraph } from "./typography-DDpAXXrz.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { g as getResumeData } from "./resume.server-Dj5kc5nf.js";
import "clsx";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "yaml";
import "zod";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./github.server-CeJRQaMc.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
const resumeStyles = "/assets/resume-CSC5AhrI.css";
const meta = () => [{
  title: `AbhiDev' Resume`
}, {
  name: "description",
  content: `A quick look at AbhiDev' work history.`
}];
const links = () => [{
  rel: "stylesheet",
  href: resumeStyles
}];
async function loader({
  request
}) {
  const resumeData = await getResumeData({
    request
  });
  return data({
    resumeData
  });
}
function getViewKey(isShort) {
  return isShort ? "short" : "long";
}
function getRecognitionView(resumeData) {
  return resumeData.recognition ?? resumeData.recognitionByLength ?? {
    short: [],
    long: []
  };
}
function formatMarkdown(resumeData, isShort) {
  const viewKey = getViewKey(isShort);
  const {
    header,
    summary,
    publicWork,
    experienceLong,
    experienceShort,
    projects,
    skills,
    education
  } = resumeData;
  const experience = isShort ? experienceShort : experienceLong;
  const recognitionView = getRecognitionView(resumeData);
  const lines = [`# ${header.name}`, `${header.title} · ${header.location}`, "", header.links.map((link) => `[${link.label}](${link.href})`).join(" | "), "", "## Summary", ...summary[viewKey].map((item) => `- ${item}`), "", "## Public Work", ...publicWork[viewKey].map((item) => `- ${item}`), "", "## Experience", ...experience.flatMap((role) => [`**${role.company} — ${role.role} (${role.dates})**`, `${role.context}`, ...role.bullets[viewKey].map((item) => `- ${item}`), ""]), "## Skills", ...skills.map((skill) => `- ${skill}`), "", "## Recognition", ...recognitionView[viewKey].map((item) => `- ${item}`), "", "## Education", ...education.map((item) => `- ${item.degree}, ${item.school} (${item.year})`)];
  if (projects.length) {
    lines.push("## Selected Projects", ...projects.map((project) => `- ${project.name} — ${project.description}`), "");
  }
  return lines.join("\n").trim();
}
const resume = UNSAFE_withComponentProps(function ResumePage({
  loaderData: {
    resumeData
  }
}) {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");
  const isShort = view === "short";
  const viewKey = getViewKey(isShort);
  if (!resumeData) {
    return /* @__PURE__ */ jsx("div", {
      className: "resume-page",
      children: /* @__PURE__ */ jsx(Grid, {
        className: "mx-10vw my-24",
        children: /* @__PURE__ */ jsxs("div", {
          className: "col-span-full rounded-lg border border-gray-200 p-8 dark:border-gray-600",
          children: [/* @__PURE__ */ jsx(H4, {
            as: "h2",
            className: "mb-3",
            children: "Resume is not available right now."
          }), /* @__PURE__ */ jsxs(Paragraph, {
            className: "mb-4",
            children: ["We are likely having trouble with our GitHub integration. Please try again soon, or browse the content directly on", " ", /* @__PURE__ */ jsx("a", {
              href: externalLinks.githubRepo,
              target: "_blank",
              rel: "noreferrer noopener",
              className: "text-primary underline",
              children: "GitHub"
            }), "."]
          }), /* @__PURE__ */ jsx(ButtonLink, {
            variant: "primary",
            to: externalLinks.githubRepo,
            children: "Open GitHub repo"
          })]
        })
      })
    });
  }
  const data2 = resumeData;
  const printLinks = data2.header.links.filter((link) => link.includeInPrint);
  const recognitionView = getRecognitionView(data2);
  function handleCopyMarkdown() {
    const markdown = formatMarkdown(data2, isShort);
    void navigator.clipboard.writeText(markdown);
  }
  function handlePrint() {
    window.print();
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "resume-page",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "resume-toggle",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "resume-toggle__links",
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/resume",
          prefetch: "intent",
          className: isShort ? "resume-toggle__link" : "resume-toggle__link is-active",
          children: "Full"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/resume?view=short",
          prefetch: "intent",
          className: isShort ? "resume-toggle__link is-active" : "resume-toggle__link",
          children: "Short (1 page)"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "resume-toggle__actions",
        children: [/* @__PURE__ */ jsx("button", {
          type: "button",
          className: "resume-toggle__button",
          onClick: handleCopyMarkdown,
          children: "Copy as Markdown"
        }), /* @__PURE__ */ jsx("button", {
          type: "button",
          className: "resume-toggle__button",
          onClick: handlePrint,
          children: "Print"
        })]
      })]
    }), /* @__PURE__ */ jsxs("main", {
      className: "resume-main",
      children: [/* @__PURE__ */ jsxs("header", {
        className: "resume-header",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "resume-header__identity",
          children: [/* @__PURE__ */ jsx("img", {
            className: "resume-photo",
            src: "https://res.cloudinary.com/abhidev-com/image/upload/f_auto,q_auto,dpr_2.0,h_200,ar_1:1,c_fill/abhi/profile",
            alt: "Photo of AbhiDev"
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "resume-name",
              children: data2.header.name
            }), /* @__PURE__ */ jsx("p", {
              className: "resume-title",
              children: data2.header.title
            }), /* @__PURE__ */ jsx("p", {
              className: "resume-location",
              children: data2.header.location
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "resume-links resume-links--screen",
          children: data2.header.links.map((link, index) => /* @__PURE__ */ jsxs("span", {
            children: [/* @__PURE__ */ jsx("a", {
              href: link.href,
              target: "_blank",
              rel: "noreferrer noopener",
              children: link.label
            }), index < data2.header.links.length - 1 ? " | " : null]
          }, link.href))
        }), /* @__PURE__ */ jsx("div", {
          className: "resume-links resume-links--print",
          children: printLinks.map((link, index) => /* @__PURE__ */ jsxs("span", {
            children: [/* @__PURE__ */ jsx("a", {
              href: link.href,
              children: link.label
            }), index < printLinks.length - 1 ? " | " : null]
          }, link.href))
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "resume-section",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "resume-heading",
          children: "Summary"
        }), /* @__PURE__ */ jsx("ul", {
          className: "resume-bullets",
          children: data2.summary[viewKey].map((item) => /* @__PURE__ */ jsx("li", {
            children: item
          }, item))
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "resume-section",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "resume-heading",
          children: "Public Work"
        }), /* @__PURE__ */ jsx("ul", {
          className: "resume-bullets",
          children: data2.publicWork[viewKey].map((item) => /* @__PURE__ */ jsx("li", {
            children: item
          }, item))
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "resume-section",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "resume-heading",
          children: "Experience"
        }), /* @__PURE__ */ jsx("div", {
          className: "resume-experience",
          children: (isShort ? data2.experienceShort : data2.experienceLong).map((job) => /* @__PURE__ */ jsxs("article", {
            className: "resume-job",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "resume-job__row",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "resume-job__title",
                children: [/* @__PURE__ */ jsx("strong", {
                  children: job.company
                }), " — ", job.role]
              }), /* @__PURE__ */ jsx("div", {
                className: "resume-job__dates",
                children: job.dates
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "resume-job__context",
              children: job.context
            }), /* @__PURE__ */ jsx("ul", {
              className: "resume-bullets",
              children: job.bullets[viewKey].map((bullet) => /* @__PURE__ */ jsx("li", {
                children: bullet
              }, bullet))
            })]
          }, `${job.company}-${job.role}`))
        })]
      }), data2.projects.length ? /* @__PURE__ */ jsxs("section", {
        className: "resume-section",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "resume-heading",
          children: "Selected Projects"
        }), /* @__PURE__ */ jsx("ul", {
          className: "resume-bullets",
          children: data2.projects.map((project) => /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              children: project.name
            }), " — ", project.description]
          }, project.name))
        })]
      }) : null, /* @__PURE__ */ jsxs("section", {
        className: "resume-section",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "resume-heading",
          children: "Skills"
        }), isShort ? /* @__PURE__ */ jsx("p", {
          className: "resume-inline",
          children: data2.skills.join(" · ")
        }) : /* @__PURE__ */ jsx("ul", {
          className: "resume-bullets",
          children: data2.skills.map((skill) => /* @__PURE__ */ jsx("li", {
            children: skill
          }, skill))
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "resume-section",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "resume-heading",
          children: "Recognition"
        }), isShort ? /* @__PURE__ */ jsx("p", {
          className: "resume-inline",
          children: recognitionView.short.join(" · ")
        }) : /* @__PURE__ */ jsx("ul", {
          className: "resume-bullets",
          children: recognitionView.long.map((item) => /* @__PURE__ */ jsx("li", {
            children: item
          }, item))
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "resume-section",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "resume-heading",
          children: "Education"
        }), /* @__PURE__ */ jsx("p", {
          className: "resume-inline",
          children: data2.education.map((item) => `${item.degree}, ${item.school} (${item.year})`).join(" · ")
        })]
      })]
    })]
  });
});
export {
  resume as default,
  links,
  loader,
  meta
};
//# sourceMappingURL=resume-BzFI0ytS.js.map
