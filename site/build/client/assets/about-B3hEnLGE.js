import { UNSAFE_withComponentProps, data } from "react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as ArrowLink } from "./arrow-button-DBVn13Kl.js";
import { F as FeatureCard } from "./feature-card-BVbTeXh_.js";
import { clsx } from "clsx";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { d as TrophyIcon, b as CodeIcon, J as StarIcon, K as BadgeIcon, N as AwardIcon, U as UsersIcon, O as MugIcon, Q as BookIcon, V as FastForwardIcon } from "./icons-Xl-Om4A1.js";
import { c as useRootData, B as BlogSection } from "./root-BtDGpB2R.js";
import { H as HeaderSection } from "./header-section-BSZTMYmt.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
import { a as H6, c as H2, P as Paragraph, H as H3 } from "./typography-DDpAXXrz.js";
import { i as images, g as getImgProps, c as getSocialImageWithPreTitle } from "./images-D8NqauwH.js";
import { g as getBlogRecommendations } from "./blog.server-C4fS0n4p.js";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import shuffle from "lodash/shuffle.js";
import "lodash/sortBy.js";
import { r as reuseUsefulLoaderHeaders, b as getDisplayUrl, g as getUrl } from "./misc-DM3BUXHg.js";
import { g as getSocialMetas } from "./seo-B3cPpSFw.js";
import { g as getTalksAndTags } from "./talks.server-B60mwIsu.js";
import { g as getServerTimeHeader } from "./timing.server-Ckj1L-xw.js";
import "framer-motion";
import "react";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "litefs-js";
import "litefs-js/remix";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "@reach/dialog";
import "./button-B-8RrXF2.js";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./theme-D6IyWRbl.js";
import "@conform-to/zod/v4";
import "cookie";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./form-elements-D3OfaKUp.js";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-omJeRY6i.js";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./env.server-DPCBxZtL.js";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./theme.server-D5mszc13.js";
import "./user-info.server-DQEJabU4.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
import "p-limit";
import "match-sorter";
import "./mdx.server-CumfvRLd.js";
import "@remark-embedder/core";
import "@remark-embedder/transformer-oembed";
import "lz-string";
import "mdx-bundler";
import "p-queue";
import "reading-time";
import "remark-autolink-headings";
import "remark-gfm";
import "remark-slug";
import "unist-util-visit";
import "http";
import "https";
import "metascraper";
import "metascraper-description";
import "metascraper-image";
import "metascraper-title";
import "./github.server-CeJRQaMc.js";
import "path";
import "@octokit/plugin-throttling";
import "@octokit/rest";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@sindresorhus/slugify";
import "yaml";
function BackgroundYouTubeEmbed({
  id,
  title,
  className
}) {
  const url = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  url.searchParams.set("autoplay", "1");
  url.searchParams.set("controls", "0");
  url.searchParams.set("rel", "0");
  url.searchParams.set("mute", "0");
  url.searchParams.set("loop", "1");
  url.searchParams.set("playlist", id);
  url.searchParams.set("modestbranding", "1");
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("iv_load_policy", "3");
  return /* @__PURE__ */ jsxs("div", { className: clsx("relative overflow-hidden rounded-3xl bg-black", className), children: [
    /* @__PURE__ */ jsx(
      "iframe",
      {
        className: "absolute left-1/2 top-1/2 h-[170%] w-[170%] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2",
        src: url.toString(),
        title,
        allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
        allowFullScreen: true,
        frameBorder: "0"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-black/10" })
  ] });
}
const links$1 = () => [
  { rel: "preconnect", href: "https://www.youtube-nocookie.com" },
  { rel: "preconnect", href: "https://www.google.com" }
];
async function loader({
  request
}) {
  const timings = {};
  const {
    talks
  } = await getTalksAndTags({
    request,
    timings
  });
  return data({
    blogRecommendations: await getBlogRecommendations({
      request,
      timings
    }),
    // they're ordered by date, so we'll grab two random of the first 10.
    talkRecommendations: shuffle(talks.slice(0, 14)).slice(0, 4)
  }, {
    headers: {
      "Cache-Control": "private, max-age=3600",
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
    title: "About Aldev",
    description: "Get to know Aldev",
    keywords: "about, AI engineer, ML researcher, full stack developer",
    url: getUrl(requestInfo),
    image: getSocialImageWithPreTitle({
      url: getDisplayUrl(requestInfo),
      featuredImage: "abhi/video-stills/snowboard-butter",
      preTitle: "Get to know",
      title: `Aldev`
    })
  });
};
const links = () => {
  return links$1();
};
function AboutIndex({
  loaderData
}) {
  const {
    blogRecommendations,
    talkRecommendations
  } = loaderData;
  const {
    requestInfo
  } = useRootData();
  const permalinkAutoplay = `${requestInfo.origin}/about?autoplay`;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Hi, I'm Aldev, an AI Engineer and Full Stack Developer.",
      imageBuilder: images.snowboard,
      arrowUrl: "#about-me",
      arrowLabel: "Get to know more about me"
    }), /* @__PURE__ */ jsx(Grid, {
      as: "main",
      className: "mt-16 mb-24 lg:mb-48",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full",
        children: [/* @__PURE__ */ jsx("div", {
          className: "rounded-3xl overflow-hidden bg-black shadow-lg shadow-black/20",
          children: /* @__PURE__ */ jsx(BackgroundYouTubeEmbed, {
            id: "mUnMSwmqg2w",
            title: "Formula One racing car music",
            className: "h-[55vh] min-h-[360px]"
          })
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-6 text-xl text-slate-500",
          children: `Listen to this full Formula One racing car music track live on the page.`
        }), /* @__PURE__ */ jsx("a", {
          className: "underlined",
          target: "_blank",
          rel: "noreferrer noopener",
          href: `https://x.com/intent/tweet?${new URLSearchParams({
            url: permalinkAutoplay,
            text: `I just watched @Aldev' life flash before my eyes.`
          })}`,
          children: `Share this video.`
        })]
      })
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mt-16 mb-24 lg:mb-48",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full mb-12 lg:col-span-4 lg:mb-0",
        children: /* @__PURE__ */ jsx(H6, {
          as: "h2",
          children: `How I got where we are now.`
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full mb-8 lg:col-span-8 lg:mb-20",
        children: [/* @__PURE__ */ jsx(H2, {
          as: "p",
          className: "mb-8",
          children: `I am a passionate AI Engineer from India focused on intelligent systems, NLP, and computer vision.`
        }), /* @__PURE__ */ jsx(H2, {
          className: "mb-12",
          variant: "secondary",
          as: "p",
          children: `
              After graduating High School and serving a 2 year mission in the
              Missouri Independence Mission for The Church of Jesus Christ of
              Latter-day Saints, I went to BYU where I graduated with a Master
              of Science in Information Systems degree in 2014.
            `
        }), /* @__PURE__ */ jsx(ArrowLink, {
          className: "mb-16",
          to: "/blog/2010s-decade-in-review",
          children: `Read my full story`
        }), /* @__PURE__ */ jsx("div", {
          className: "w-full lg:pr-12",
          children: /* @__PURE__ */ jsx("img", {
            ...getImgProps(images.abhiWorkingInNature, {
              className: "w-full rounded-lg object-cover",
              widths: [512, 840, 1024, 1680, 2520],
              sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 50vw", "800px"]
            })
          })
        })]
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "lg:mb:0 col-span-full mb-4 lg:col-span-4 lg:col-start-5 lg:mr-12",
        children: `
            Early on in my career I decided I wanted to be an expert in
            JavaScript. So I set my mind on mastering the world's most popular
            programming language. I spent countless hours writing JavaScript
            for the companies I worked for as well as in the evenings for open
            source and other side projects. Eventually I even represented PayPal
            on the TC-39 (the committee responsible for standardizing the
            JavaScript language). I feel like I achieved my goal of becoming an
            expert in JavaScript, but I do need to keep up just like everyone
            else, which is an enjoyable challenge.
          `
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "col-span-full lg:col-span-4 lg:col-start-9 lg:mr-12",
        children: `
            I've also always been excited about sharing what I know with others.
            When I was in school, I signed up to be a tutor for my classmates
            and once I even got Firebase to sponsor pizza for me to give an
            informal workshop about Angular.js to my fellow students. I was a
            speaker at the first meetup I ever attended, and I've now delivered
            over a hundred talks on topics including JavaScript, React, Testing,
            Careers, and more. One of my talks got noticed by egghead and I was
            invited to turn that talk into an egghead course. The rest is
            history!
          `
      })]
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-24 lg:mb-64",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6 lg:col-start-7",
        children: /* @__PURE__ */ jsx("div", {
          className: "mb-12 lg:mb-0",
          children: /* @__PURE__ */ jsx("img", {
            ...getImgProps(images.happySnowboarder, {
              className: "rounded-lg object-cover",
              widths: [512, 650, 840, 1024, 1300, 1680, 2e3, 2520],
              sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "650px"],
              transformations: {
                gravity: "faces",
                resize: {
                  type: "fill",
                  aspectRatio: "3:4"
                }
              }
            })
          })
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full lg:col-span-5 lg:col-start-1 lg:row-start-1",
        children: [/* @__PURE__ */ jsx(H2, {
          className: "mb-10",
          children: "Here are the principles that guide my engineering journey."
        }), /* @__PURE__ */ jsx(H6, {
          as: "h3",
          className: "mb-4",
          children: `Continuous Learning`
        }), /* @__PURE__ */ jsx(Paragraph, {
          className: "mb-12",
          children: `
              You can be the smartest and most skilled software engineer in the
              world, but if you're not kind to those with whom you interact,
              you'll never reach your full potential and you'll always be
              chasing the next thing to bring you happiness in life. Be kind.
            `
        }), /* @__PURE__ */ jsx(H6, {
          as: "h3",
          className: "mb-4",
          children: `Open Source and Research`
        }), /* @__PURE__ */ jsx(Paragraph, {
          className: "mb-12",
          children: `
              One of the biggest things that has helped me learn is by
              committing myself to sharing what I know with others. Between
              podcasts, blog posts, talks, and workshops, I force myself into
              situations where I have to be accountable to those I'm teaching
              to really know my stuff. And as a result, a lot of people have
              learned from me as well.
            `
        }), /* @__PURE__ */ jsx(H6, {
          as: "h3",
          className: "mb-4",
          children: `Build for Real Impact`
        }), /* @__PURE__ */ jsx(Paragraph, {
          className: "mb-12",
          children: `
              I've worked with a ton of developers in my role as a team member
              at companies I've worked at as well as in the open source
              community. I've found it to be invaluable to collaborate well with
              others. I value giving credit where it is due and celebrating
              the successes of others with them. We can accomplish much more
              together than separately.
            `
        })]
      })]
    }), /* @__PURE__ */ jsx(HeaderSection, {
      className: "mb-16",
      ctaUrl: "/talks",
      cta: "See all projects",
      title: "I build production-grade AI and ML systems.",
      subTitle: "Here are a couple recent ones."
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-24 gap-5 lg:mb-64",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full mb-12 lg:mb-20",
        children: /* @__PURE__ */ jsx("img", {
          id: "about-me",
          ...getImgProps(images.abhiSpeakingAllThingsOpen, {
            className: "rounded-lg object-cover",
            widths: [280, 560, 840, 1100, 1300, 2600, 3900],
            sizes: ["(min-width:1620px) 1280px", "80vw"]
          })
        })
      }), talkRecommendations.map((talk) => /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(TalkCard, {
          tags: talk.tags,
          dateDisplay: talk.deliveries[0]?.dateDisplay,
          title: talk.title,
          talkUrl: `/talks/${talk.slug}`
        })
      }, talk.slug))]
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-24 lg:mb-64",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6 lg:col-start-1",
        children: /* @__PURE__ */ jsx("div", {
          className: "mb-12 lg:mb-0",
          children: /* @__PURE__ */ jsx("img", {
            ...getImgProps(images.microphoneWithHands, {
              className: "rounded-lg object-cover",
              widths: [512, 650, 840, 1024, 1300, 1680, 2e3, 2520],
              sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "650px"],
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
        className: "col-span-full lg:col-span-4 lg:col-start-8 lg:row-start-1",
        children: [/* @__PURE__ */ jsx(H2, {
          className: "mb-10 lg:mt-24",
          children: `I have had the privilege to do a lot of cool interviews and chats.`
        }), /* @__PURE__ */ jsx(H2, {
          variant: "secondary",
          as: "p",
          className: "mb-14",
          children: `Check out my appearances on podcasts, blog and other cool stuff.`
        }), /* @__PURE__ */ jsx(ArrowLink, {
          to: "/appearances",
          children: "See all appearances"
        })]
      })]
    }), /* @__PURE__ */ jsx(HeaderSection, {
      title: "I've been recognized for my contributions.",
      subTitle: "Here are some of the honors and awards I've received.",
      className: "mb-16"
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-24 lg:mb-64",
      rowGap: true,
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "Google Developer Expert (GDE)",
          description: "Recognized by Google as an expert in web technologies, particularly React and testing. I help developers build better applications through education and open source contributions.",
          icon: /* @__PURE__ */ jsx(TrophyIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "Microsoft MVP",
          description: "Awarded Microsoft MVP status for exceptional contributions to the developer community. I'm recognized for my work in JavaScript, React, and developer education.",
          icon: /* @__PURE__ */ jsx(CodeIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "GitHub Star",
          description: "Selected as a GitHub Star for my open source contributions and community leadership. I help developers learn and grow through my projects and educational content.",
          icon: /* @__PURE__ */ jsx(StarIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "TC-39 Committee Member",
          description: "Represented PayPal on the TC-39 committee, which is responsible for standardizing the JavaScript language. Helped shape the future of JavaScript.",
          icon: /* @__PURE__ */ jsx(BadgeIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "GitNation OS Awards",
          description: "The Most Impactful Contribution to the community awarded for my work on Testing Library.",
          icon: /* @__PURE__ */ jsx(AwardIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "Owen Cherrington Scholarship",
          description: "Given to students who exemplify characteristics such as scholarship, hard work, and selfless service in making the Information Systems Jr. Core a better experience for classmates.",
          icon: /* @__PURE__ */ jsx(TrophyIcon, {
            size: 48
          })
        })
      })]
    }), /* @__PURE__ */ jsx(HeaderSection, {
      title: "Here are some random fun facts.",
      subTitle: "Some unique things about me.",
      className: "mb-16"
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-24 lg:mb-64",
      rowGap: true,
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "I have 11 brothers and sisters",
          description: "Yup! There are 6 boys and 6 girls in my family. I'm second to last. No twins. We all have the same mom and dad. Yes my parents are super heroes 🦸‍♀️ 🦸",
          icon: /* @__PURE__ */ jsx(UsersIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "I can still do a backflip",
          description: "When I was a kid, I competed in various gymnastics events. As of 2021, I can still do a backflip 🤸‍♂️",
          icon: /* @__PURE__ */ jsx(AwardIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "I've never had a sip of alcohol or coffee",
          description: "It's a religious thing. That said, I do appreciate offers to go out for drinks! I'll just have a Hawaiian Punch thank you 🧃",
          icon: /* @__PURE__ */ jsx(MugIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "I'm an Eagle Scout",
          description: "When I was 14, I got my friends and scout leaders to plant 15 trees in a new park in town for my eagle scout project 🦅",
          icon: /* @__PURE__ */ jsx(BadgeIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "I've written a novel",
          description: "In 2018, I wanted to get good at telling stories, so I participated in National Novel Writing Month and wrote a 50k word novel in one month 📘",
          icon: /* @__PURE__ */ jsx(BookIcon, {
            size: 48
          })
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "col-span-full lg:col-span-6",
        children: /* @__PURE__ */ jsx(FeatureCard, {
          title: "I listen to books and podcasts at 3x",
          description: "I've worked my way up to 3x listening so I could listen to more. So far I've saved ~300 days of listening by doing this 🎧",
          icon: /* @__PURE__ */ jsx(FastForwardIcon, {
            size: 48
          })
        })
      })]
    }), /* @__PURE__ */ jsxs(Grid, {
      className: "mb-24 lg:mb-64",
      children: [/* @__PURE__ */ jsx("div", {
        className: "col-span-full mb-10 lg:col-span-6 lg:col-start-1 lg:mb-0",
        children: /* @__PURE__ */ jsx("img", {
          ...getImgProps(images.teslaY, {
            className: "rounded-lg object-contain",
            widths: [420, 512, 840, 1260, 1024, 1680, 2520],
            sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "630px"]
          })
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "col-span-full lg:col-span-4 lg:col-start-8 lg:row-start-1",
        children: [/* @__PURE__ */ jsx(H2, {
          className: "mb-10",
          children: `Curious to know the stuff I use?`
        }), /* @__PURE__ */ jsx(H2, {
          variant: "secondary",
          as: "p",
          className: "mb-14",
          children: `I keep a "uses" page updated with the stuff I use.`
        }), /* @__PURE__ */ jsx(ArrowLink, {
          to: "/uses",
          children: `Check out the uses page`
        })]
      })]
    }), /* @__PURE__ */ jsx(BlogSection, {
      articles: blogRecommendations,
      title: "Have a look at my writing.",
      description: "These are the most popular."
    })]
  });
}
function TalkCard({
  tags,
  dateDisplay,
  title,
  talkUrl
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-secondary text-primary flex h-full w-full flex-col justify-between rounded-lg p-16 pt-20",
    children: [/* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("div", {
        className: "-mr-4 mb-12 flex flex-wrap",
        children: tags.map((tag) => /* @__PURE__ */ jsx("div", {
          className: "text-primary mr-4 mb-4 rounded-full bg-gray-300 px-6 py-1 dark:bg-gray-700",
          children: tag
        }, tag))
      }), /* @__PURE__ */ jsx(Paragraph, {
        as: "span",
        className: "mb-5",
        children: dateDisplay ?? "TBA"
      }), /* @__PURE__ */ jsx(H3, {
        className: "mb-5",
        children: title
      })]
    }), /* @__PURE__ */ jsxs(ArrowLink, {
      to: talkUrl,
      children: [/* @__PURE__ */ jsx("span", {
        className: "hidden md:inline",
        children: "Have a look at this talk"
      }), /* @__PURE__ */ jsx("span", {
        className: "md:hidden",
        children: "Read more"
      })]
    })]
  });
}
const about = UNSAFE_withComponentProps(AboutIndex);
export {
  about as default,
  headers,
  links,
  loader,
  meta
};
//# sourceMappingURL=about-B3hEnLGE.js.map
