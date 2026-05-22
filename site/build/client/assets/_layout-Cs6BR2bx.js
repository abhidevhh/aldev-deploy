import { UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Accordion, AccordionItem, useAccordionItemContext, AccordionButton, AccordionPanel } from "@reach/accordion";
import { motion } from "framer-motion";
import { a as ButtonLink } from "./button-C3vj8DF4.js";
import { F as FeatureCard } from "./feature-card-BVbTeXh_.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { D as DiscordLogo, H as HeartIcon, $ as UsersIcon, n as CodeIcon, L as LaptopIcon, E as EmojiHappyIcon, f as BriefcaseIcon, O as RocketIcon, Z as TrophyIcon, u as MessageIcon } from "./icons-DQAXl5Y1.js";
import { C as CourseSection } from "./course-section-C1mfg3lC.js";
import { H as HeaderSection } from "./header-section-B2Ylwupf.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { T as TestimonialSection } from "./testimonial-section-DemH5LXi.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { a as H2, e as H6, P as Paragraph, d as H5 } from "./typography-DBSbiCOF.js";
import { e as externalLinks } from "./external-links-BEDnFUME.js";
import { h as images, d as getImgProps, g as getGenericSocialImage } from "./images-Dyd95Mrb.js";
import { u as useCapturedRouteError } from "./misc-react-BeZfIuw-.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { g as getTestimonials } from "./testimonials.server-DAGtgv6g.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import { x as useRootData } from "./root-XTBE-Fp5.js";
import { g as getDiscordAuthorizeURL, w as reuseUsefulLoaderHeaders, e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import "clsx";
import "./course-card-g0gZgY38.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "cookie";
import "react";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./arrow-button-DsHCk3Gf.js";
import "./testimonial-card-DnXWXfPy.js";
import "cloudinary-build-url";
import "emoji-regex";
import "@sentry/react-router";
import "md5-hash";
import "@sindresorhus/slugify";
import "yaml";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import "lodash/shuffle.js";
import "lodash/sortBy.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./env.server-DPCBxZtL.js";
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
import "./github.server-u_4PqFTT.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "@reach/dialog";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "mdx-bundler/client/index.js";
import "./form-elements-DKDR40lU.js";
import "downshift";
import "./promotification-YMEmucWd.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "date-fns";
async function loader({
  request
}) {
  const timings = {};
  const testimonials = await getTestimonials({
    request,
    timings,
    subjects: ["Discord Community"],
    categories: ["community"]
  });
  return data({
    testimonials
  }, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      Vary: "Cookie",
      "Server-Timing": getServerTimeHeader(timings)
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  return getSocialMetas({
    title: "The Epic Web Community on Discord",
    description: "Make friends, share ideas, connect, network, and improve yourself in the Epic Web Community on Discord",
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.helmet.id,
      words: `Join the Epic Web Community on Discord`
    })
  });
};
function CategoryCardContent({
  title,
  description,
  number
}) {
  const {
    isExpanded
  } = useAccordionItemContext();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(H5, {
      as: "div",
      className: "text-primary w-full transition",
      children: /* @__PURE__ */ jsxs(AccordionButton, {
        className: "relative w-full text-left focus:outline-none",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute -top-12 -right-8 -bottom-12 -left-8 rounded-lg lg:-right-20 lg:-left-28"
        }), /* @__PURE__ */ jsxs("span", {
          className: "absolute top-0 -left-16 hidden text-lg lg:block",
          children: [number.toString().padStart(2, "0"), "."]
        }), /* @__PURE__ */ jsx("span", {
          children: title
        }), /* @__PURE__ */ jsx("span", {
          className: "absolute top-1 right-0 lg:-right-8",
          children: /* @__PURE__ */ jsxs("svg", {
            width: "24",
            height: "24",
            fill: "none",
            viewBox: "0 0 24 24",
            children: [/* @__PURE__ */ jsx(motion.path, {
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "1.5",
              d: "M12 5.75V18.25",
              animate: {
                scaleY: isExpanded ? 0 : 1
              }
            }), /* @__PURE__ */ jsx("path", {
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "1.5",
              d: "M18.25 12L5.75 12"
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx(AccordionPanel, {
      as: motion.div,
      className: "block overflow-hidden",
      initial: false,
      animate: isExpanded ? {
        opacity: 1,
        height: "auto"
      } : {
        opacity: 0,
        height: 0
      },
      children: /* @__PURE__ */ jsx(Paragraph, {
        className: "mt-4 lg:mt-12",
        children: description
      })
    })]
  });
}
function CategoryCard(props) {
  return /* @__PURE__ */ jsx(AccordionItem, {
    className: "bg-secondary hover:bg-alt focus-within:bg-alt col-span-full flex w-full flex-col items-start rounded-lg px-8 py-12 transition lg:col-span-6 lg:pr-20 lg:pl-28",
    children: /* @__PURE__ */ jsx(CategoryCardContent, {
      ...props
    })
  });
}
const _layout = UNSAFE_withComponentProps(function Discord({
  loaderData: data2
}) {
  const {
    requestInfo,
    user
  } = useRootData();
  const authorizeURL = user ? getDiscordAuthorizeURL(requestInfo.origin) : externalLinks.discord;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(DiscordLogo, {}), `Make friends on our discord server.`]
      }),
      subtitle: "Learn to become better developers together.",
      imageBuilder: images.helmet,
      arrowUrl: "#reasons-to-join",
      arrowLabel: "Is this something for me?",
      action: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsxs(Grid, {
        className: "mb-24 lg:mb-64",
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full lg:col-span-6 lg:col-start-1",
          children: /* @__PURE__ */ jsx("div", {
            className: "mb-12 aspect-[4/6] lg:mb-0",
            children: /* @__PURE__ */ jsx("img", {
              ...getImgProps(images.abhiListeningAtReactRally, {
                className: "rounded-lg object-cover",
                widths: [410, 650, 820, 1230, 1640, 2460],
                sizes: ["(max-width: 1023px) 80vw", "(min-width:1024px) and (max-width:1620px) 40vw", "630px"],
                transformations: {
                  resize: {
                    type: "fill",
                    aspectRatio: "3:4"
                  }
                }
              })
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1",
          children: [/* @__PURE__ */ jsx(H2, {
            id: "reasons-to-join",
            className: "mb-10",
            children: `Here's why you should join the server.`
          }), /* @__PURE__ */ jsx(ButtonLink, {
            className: "mb-32",
            variant: "primary",
            href: authorizeURL,
            children: "Join Discord"
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `What is it?`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-12",
            children: `
                Discord is a chat application. The Epic Web Community on Discord is
                a community of people who want to make connections, share ideas,
                and use software to help make the world a better place.
              `
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Make connections and friends`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-12",
            children: `
                We're better when we work together. Discord allows us to have
                meaningful and nuanced conversations about building software.
                If you want to ask questions or provide your own opinions, this
                discord community is for you. We'll celebrate your successes and
                lament your misfortunes and failures. This community is focused
                on AI engineering and full stack systems primarily, but we're humans and we
                embrace that (we even have a channel on parenting!).
              `
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Share ideas`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-12",
            children: `
                This community is a fantastic place to get and provide feedback
                on fun and interesting ideas. We're all motivated to use
                software to make the world better in a wide variety of ways.
                Got a project you've been working on? Want to discover
                facinating ways people are using software? This is the place to
                be.
              `
          })]
        })]
      }), /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24 lg:mb-48",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "col-span-full",
          children: [/* @__PURE__ */ jsx(H2, {
            className: "mb-3 lg:mt-6",
            children: `Not sure what to expect from the discord?`
          }), /* @__PURE__ */ jsx(H2, {
            as: "p",
            variant: "secondary",
            className: "mb-14",
            children: `Here are some features for you at a glance.`
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full",
          children: /* @__PURE__ */ jsxs(Grid, {
            rowGap: true,
            nested: true,
            children: [/* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "High quality people",
                description: "Our onboarding process, enforced code of conduct, and fantastic moderators keep it a friendly place to be.",
                icon: /* @__PURE__ */ jsx(HeartIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "Learning clubs",
                description: "Form study groups and learn better together.",
                icon: /* @__PURE__ */ jsx(UsersIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "Meetups",
                description: "Discord-bot facilitated feature to plan virtual events (like streams) and connect with other devs.",
                icon: /* @__PURE__ */ jsx(CodeIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "Software Channels",
                description: "Channels on popular topics like frontend, backend, career, and more.",
                icon: /* @__PURE__ */ jsx(LaptopIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "Life Channels",
                description: "We're not robots. We're people. And we have kids, pets, and money. Channels for those and more.",
                icon: /* @__PURE__ */ jsx(EmojiHappyIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "Jobs channel",
                description: "Looking for work or an engineer? You wouldn't be the first to start an employment relationship here.",
                icon: /* @__PURE__ */ jsx(BriefcaseIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "EpicReact.dev Channels",
                description: "There's a channel for each of the workshops in EpicReact.dev so you can get/give a hand when you get stuck.",
                icon: /* @__PURE__ */ jsx(RocketIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "TestingJavaScript.com Channels",
                description: "Leveling up your testing experience? Sweet! Get and give help in these channels.",
                icon: /* @__PURE__ */ jsx(TrophyIcon, {
                  size: 48
                })
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "col-span-full lg:col-span-4",
              children: /* @__PURE__ */ jsx(FeatureCard, {
                title: "Team Channels",
                description: user ? `As a member of the ${user.team.toLocaleLowerCase()} team, connect your discord account and you'll get access to the exclusive ${user.team.toLocaleLowerCase()} team channels.` : "Sign up for an account on abhidev.com and connect your discord account to get access to the exclusive team channels.",
                icon: /* @__PURE__ */ jsx(MessageIcon, {
                  size: 48
                })
              })
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24 lg:mb-64",
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full mb-12 hidden lg:col-span-4 lg:mb-0 lg:block",
          children: /* @__PURE__ */ jsx(H6, {
            as: "h2",
            children: `Set up your own learning club.`
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "col-span-full mb-20 lg:col-span-8 lg:mb-28",
          children: [/* @__PURE__ */ jsx(H2, {
            as: "p",
            className: "mb-3",
            children: `
                KCD Learning Clubs are like study groups you put together yourself.
              `
          }), /* @__PURE__ */ jsx(H2, {
            as: "p",
            variant: "secondary",
            children: `
                Having a group of people with the same challenges will help you
                learn faster. The discord bot can help you find them.
              `
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-4 lg:col-start-5 lg:pr-12",
          children: [/* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `When we learn together, we learn better, and that's the idea.`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-16",
            children: `
                Research has shown that learning is more effective when you have
                a group of people to hold you accountable. It's also more fun
                and less frustrating when you can help each other.
              `
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `You can choose anything as your learning club topic.`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-16",
            children: `
                A learning club can be about anything. All that's really
                required is some sort of curriculum or schedule to keep everyone
                focused on the same goal. So you can definitely choose one of
                my courses, but you could also choose something completely
                unrelated to software. The bot doesn't care and nobody's had
                trouble filling their learning club with interested members yet!
              `
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-4 lg:col-start-9 lg:pr-12",
          children: [/* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Develop friendships with other nice learners in the community.`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-16",
            children: `
                The Epic Web Community on Discord is full of friendly people. When
                you put together a learning club here, in addition to learning
                better, you'll develop new friendships.
              `
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `You have access to me (Kent) during weekly office hours.`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-16",
            children: `
                By joining the Epic Web Community on Discord, you can ask questions
                that I'll answer during office hours. Often these questions come
                from discussions you and your fellow learners have during your
                learning club meetings. So if you all get stuck on the same
                thing, I'm there to help you get unstuck.
              `
          })]
        })]
      }), data2.testimonials.length ? /* @__PURE__ */ jsx(Spacer, {
        size: "base"
      }) : null, /* @__PURE__ */ jsx(TestimonialSection, {
        testimonials: data2.testimonials
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "base"
      }), /* @__PURE__ */ jsx(HeaderSection, {
        title: "Here's a quick look at all categories.",
        subTitle: "Click on any category to get more info.",
        className: "mb-14"
      }), /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24 lg:mb-64",
        children: [/* @__PURE__ */ jsxs(Accordion, {
          collapsible: true,
          multiple: true,
          className: "col-span-full mb-4 space-y-4 lg:col-span-6 lg:mb-0 lg:space-y-6",
          children: [/* @__PURE__ */ jsx(CategoryCard, {
            number: 1,
            title: "Welcome",
            description: "A place to introduce yourself, read the rules, talk to the bot, and get tips about the server"
          }), /* @__PURE__ */ jsx(CategoryCard, {
            number: 2,
            title: "KCD",
            description: "All the stuff I'm up to goes here. You might consider adding special notification settings to the announcements channel so you don't miss anything important."
          }), /* @__PURE__ */ jsx(CategoryCard, {
            number: 3,
            title: "Epic Web Conf",
            description: "This is where we discuss stuff going on with Epic Web Conference!"
          }), /* @__PURE__ */ jsx(CategoryCard, {
            number: 4,
            title: "Epic Stack",
            description: "Talk with others who are buildings applications using the Epic Stack."
          })]
        }), /* @__PURE__ */ jsxs(Accordion, {
          collapsible: true,
          multiple: true,
          className: "col-span-full space-y-4 lg:col-span-6 lg:space-y-6",
          children: [/* @__PURE__ */ jsx(CategoryCard, {
            number: 5,
            title: "Tech",
            description: `Need to talk software? That's what this category is for. We've got your whole tech stack covered here (and if we're missing anything, that's what "general" is for 😅). And you've got career related topics here too.`
          }), /* @__PURE__ */ jsx(CategoryCard, {
            number: 6,
            title: "Life",
            description: `We're not automatons "turning coffee into code" 🙄. We're humans with lives, families, pets, preferences, money decisions, and joys. So we've got a channel to talk about that stuff.`
          }), /* @__PURE__ */ jsx(CategoryCard, {
            number: 7,
            title: "Courses",
            description: "Exclusive channels for folks going through the Epic Web Courses. Ask and answer questions, share your progress, and get help from others."
          }), /* @__PURE__ */ jsx(CategoryCard, {
            number: 8,
            title: "Clubs",
            description: "Here's where you can coordinate setting up a new KCD Learning Club. Club captains also get access to a special channel for captains to talk about how to make the most of the experience for everyone."
          })]
        })]
      }), /* @__PURE__ */ jsxs(Grid, {
        className: "mb-24 lg:mb-64",
        children: [/* @__PURE__ */ jsx("div", {
          className: "col-span-full lg:col-span-4 lg:col-start-2",
          children: /* @__PURE__ */ jsx("img", {
            ...getImgProps(images.helmet, {
              className: "object-contain",
              widths: [420, 512, 840, 1260, 1024, 1680, 2520],
              sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "630px"]
            })
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "col-span-full mt-4 lg:col-span-6 lg:col-start-7 lg:mt-0",
          children: [/* @__PURE__ */ jsx(H2, {
            className: "mb-8",
            children: `Life is better with friends. Find them on discord.`
          }), /* @__PURE__ */ jsx(H2, {
            variant: "secondary",
            as: "p",
            className: "mb-16",
            children: `
                Click the button below and join the community. Let's get
                better together.
              `
          }), /* @__PURE__ */ jsx(ButtonLink, {
            variant: "primary",
            href: authorizeURL,
            children: "Join Discord"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(CourseSection, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  console.error(error);
  if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Error"
      }), /* @__PURE__ */ jsx("pre", {
        children: error.stack
      })]
    });
  } else {
    return /* @__PURE__ */ jsx("h2", {
      children: "Unknown Error"
    });
  }
});
export {
  ErrorBoundary,
  _layout as default,
  headers,
  loader,
  meta
};
