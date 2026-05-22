import { UNSAFE_withComponentProps, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as React from "react";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { d as BehanceIcon, s as LinkedInIcon, _ as TwitchIcon, o as CodepenIcon, q as DribbbleIcon, I as InstagramIcon, a0 as XIcon, G as GithubIcon, r as GlobeIcon } from "./icons-DQAXl5Y1.js";
import { a as ButtonLink } from "./button-C3vj8DF4.js";
import { H as HeaderSection } from "./header-section-B2Ylwupf.js";
import { H as HeroSection, g as getHeroImageProps } from "./hero-section-BNEKo3U8.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { e as H6, a as H2, P as Paragraph, c as H4, b as H3 } from "./typography-DBSbiCOF.js";
import { h as images, d as getImgProps, c as getImageBuilder, f as getSocialImageWithPreTitle } from "./images-Dyd95Mrb.js";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import shuffle from "lodash/shuffle.js";
import "lodash/sortBy.js";
import { g as getPeople } from "./credits.server-BCsf817q.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { w as reuseUsefulLoaderHeaders, m as getOrigin, e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import "clsx";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "./arrow-button-DsHCk3Gf.js";
import "framer-motion";
import "cloudinary-build-url";
import "emoji-regex";
import "@epic-web/cachified";
import "@sindresorhus/slugify";
import "yaml";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
import "zod";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-DZ6f3pgH.js";
import "./prisma.server-Cj9LRFmw.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./github.server-u_4PqFTT.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "date-fns";
async function loader({
  request
}) {
  const people = await getPeople({
    request
  });
  return data({
    people: shuffle(people)
  }, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      Vary: "Cookie"
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  const domain = new URL(getOrigin(requestInfo)).host;
  return getSocialMetas({
    title: `Who built ${domain}`,
    description: `It took a team of people to create ${domain}. This page will tell you a little bit about them.`,
    url: getUrl(requestInfo),
    image: getSocialImageWithPreTitle({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.abhiCodingOnCouch.id,
      title: `The fantastic people who built ${domain}`,
      preTitle: "Check out these people"
    })
  });
};
const icons = {
  website: /* @__PURE__ */ jsx(GlobeIcon, {
    title: "Website"
  }),
  github: /* @__PURE__ */ jsx(GithubIcon, {}),
  x: /* @__PURE__ */ jsx(XIcon, {}),
  instagram: /* @__PURE__ */ jsx(InstagramIcon, {}),
  dribbble: /* @__PURE__ */ jsx(DribbbleIcon, {}),
  codepen: /* @__PURE__ */ jsx(CodepenIcon, {}),
  twitch: /* @__PURE__ */ jsx(TwitchIcon, {}),
  linkedin: /* @__PURE__ */ jsx(LinkedInIcon, {}),
  behance: /* @__PURE__ */ jsx(BehanceIcon, {})
};
function ProfileCard({
  person
}) {
  return /* @__PURE__ */ jsxs("div", {
    id: person.id,
    className: "relative flex w-full scroll-mt-24 flex-col",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mb-8 aspect-square w-full flex-none",
      children: /* @__PURE__ */ jsx("img", {
        ...getImgProps(getImageBuilder(person.cloudinaryId, person.name), {
          className: "rounded-lg object-contain",
          widths: [280, 560, 840, 1100, 1300, 1650],
          sizes: ["(max-width:639px) 80vw", "(min-width:640px) and (max-width:1023px) 40vw", "(min-width:1024px) and (max-width:1620px) 25vw", "410px"],
          transformations: {
            resize: {
              aspectRatio: "1:1",
              type: "fill_pad"
            },
            gravity: "auto",
            background: "auto"
          }
        })
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex-auto",
      children: [/* @__PURE__ */ jsx("div", {
        className: "mb-4 text-xl font-medium text-slate-500 lowercase",
        children: person.role
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-6 flex items-center gap-2",
        children: [/* @__PURE__ */ jsx("a", {
          href: `#${person.id}`,
          "aria-label": `Permalink to contributor ${person.id}`,
          tabIndex: 0,
          className: "focus-ring text-secondary hover:text-primary focus:text-primary rounded-sm focus:outline-none",
          children: "#"
        }), /* @__PURE__ */ jsx(H3, {
          className: "mb-0",
          children: person.name
        })]
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "mb-8",
        children: person.description
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "text-secondary flex flex-none space-x-4",
      children: Object.entries(icons).map(([key, Icon]) => {
        const url = person[key];
        return url ? /* @__PURE__ */ jsx("a", {
          href: url,
          className: "hover:text-primary focus:text-primary",
          children: React.cloneElement(Icon, {
            size: 32
          })
        }, key) : null;
      })
    })]
  });
}
function CreditsIndex({
  loaderData: data2
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Curious to see all the people who helped out making this website?",
      subtitle: "Start scrolling to learn more about everyone involved.",
      image: /* @__PURE__ */ jsx("img", {
        ...getHeroImageProps(images.abhiCodingOnCouch, {
          className: "rounded-lg",
          transformations: {
            resize: {
              aspectRatio: "3:4",
              type: "crop"
            },
            gravity: "face"
          }
        })
      }),
      arrowUrl: "#intro",
      arrowLabel: "Get to know more here"
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-24 lg:mb-64",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full mb-12 lg:col-span-4 lg:mb-0",
        children: /* @__PURE__ */ jsx(H6, {
          id: "intro",
          children: `Producing this site was a team effort`
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-8 lg:col-span-8 lg:mb-20",
        children: [/* @__PURE__ */ jsxs(H2, {
          className: "mb-8",
          children: [`
              abhidev.com is more than just my developer portfolio. It's a
              place for me to share my thoughts, ideas, and experiences as
              well as the thoughts, ideas, and experiences of others (yourself
              included). It's a full fleged–`, /* @__PURE__ */ jsx("a", {
            target: "_blank",
            rel: "noreferrer noopener",
            href: "https://github.com/abhidev/abhidev.com",
            children: "open source"
          }), `–web application.`]
        }), /* @__PURE__ */ jsxs(H2, {
          variant: "secondary",
          as: "p",
          children: [/* @__PURE__ */ jsx("a", {
            href: "https://egghead.io?af=5236ad",
            children: "egghead.io"
          }), `
              and I have collaborated to make this website a
              truly high-quality and delightful learning experience for you and
              others.
            `]
        })]
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "lg:mb:0 col-span-full mb-4 lg:col-span-4 lg:col-start-5 lg:mr-12",
        children: `
            It would be impossible to list everyone who has contributed to the
            creation of this website (I'd have to list my parents, teachers,
            etc, etc, etc).
          `
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "col-span-full lg:col-span-4 lg:col-start-9 lg:mr-12",
        children: `
            But hopefully with this page, you can get an idea of the primary
            group of folks who worked to make this site great.
          `
      })]
    }), /* @__PURE__ */ jsx(HeaderSection, {
      className: "mb-16",
      title: "Everyone that helped out.",
      subTitle: "In no particular order."
    }), data2.people.length === 0 ? /* @__PURE__ */ jsx(Grid, {
      className: "mb-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full rounded-lg border border-gray-200 p-8 dark:border-gray-600",
        children: [/* @__PURE__ */ jsx(H4, {
          as: "h2",
          className: "mb-3",
          children: "No credits are available right now."
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
    }) : /* @__PURE__ */ jsx(Grid, {
      className: "gap-y-20 lg:gap-y-32",
      children: data2.people.map((person) => /* @__PURE__ */ jsx("div", {
        className: "col-span-4",
        children: /* @__PURE__ */ jsx(ProfileCard, {
          person
        })
      }, person.id))
    }), /* @__PURE__ */ jsx(Spacer, {
      size: "base"
    }), /* @__PURE__ */ jsx(HeaderSection, {
      title: "Shout-outs",
      subTitle: "Some other awesome folks",
      className: "mb-16"
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "prose prose-light dark:prose-dark gap-y-20 lg:gap-y-32",
      children: [/* @__PURE__ */ jsxs(Paragraph, {
        className: "col-span-4",
        children: [/* @__PURE__ */ jsx("a", {
          href: "https://x.com/ryanflorence",
          children: "Ryan Florence"
        }), ` and other friends at `, /* @__PURE__ */ jsx("a", {
          href: "https://remix.run",
          children: "Remix.run"
        }), `
            were super helpful as I was figuring out the best way to rewrite my
            website in this new technology with completely new and improved
            features that far exceeded what my website had been previously.
          `]
      }), /* @__PURE__ */ jsxs(Paragraph, {
        className: "col-span-4",
        children: ["The syntax highlighting theme in blog posts is inspired by", " ", /* @__PURE__ */ jsx("a", {
          href: "https://x.com/sarah_edo",
          children: "Sarah Drasner's"
        }), " ", /* @__PURE__ */ jsx("a", {
          href: "https://github.com/sdras/night-owl-vscode-theme",
          children: "Night Owl"
        }), "."]
      }), /* @__PURE__ */ jsxs(Paragraph, {
        className: "col-span-4",
        children: [`
            To prepare for the launch of this website, a number of terrific
            folks reviewed and
          `, /* @__PURE__ */ jsx("a", {
          href: "https://github.com/abhidev/abhidev.com/issues?q=is%3Aissue",
          children: "opened issues"
        }), ` and even made `, /* @__PURE__ */ jsx("a", {
          href: "https://github.com/abhidev/abhidev.com/pulls?q=is%3Apr",
          children: "pull requests"
        }), ` to get it ready for launch. Thank you!`]
      }), /* @__PURE__ */ jsxs(Paragraph, {
        className: "col-span-4",
        children: [`The folks at `, /* @__PURE__ */ jsx("a", {
          href: "https://fly.io",
          children: "Fly.io"
        }), `
            were an enormous help in getting me off the ground with hosting the
            site and databases. The backend is totally not my domain and they
            seriously helped me be successful.
          `]
      })]
    })]
  });
}
const credits = UNSAFE_withComponentProps(CreditsIndex);
export {
  credits as default,
  headers,
  loader,
  meta
};
