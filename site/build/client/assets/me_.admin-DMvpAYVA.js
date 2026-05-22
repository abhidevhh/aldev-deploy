import { UNSAFE_withComponentProps, useSearchParams, Form, UNSAFE_withErrorBoundaryProps, data, redirect } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { startOfDay, subDays, format, addDays } from "date-fns";
import * as React from "react";
import { useTable } from "react-table";
import { B as Button } from "./button-C3vj8DF4.js";
import { F as Field } from "./form-elements-DKDR40lU.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { S as SearchIcon, k as ChevronUpIcon, h as ChevronDownIcon } from "./icons-DQAXl5Y1.js";
import { H as H1, a as H2, b as H3 } from "./typography-DBSbiCOF.js";
import { b as useDebounce, u as useCapturedRouteError, c as useDoubleCheck } from "./misc-react-BeZfIuw-.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { requireAdminUser } from "./session.server-DZ6f3pgH.js";
import { x as teamDisplay, r as isTeam, d as formatNumber, i as getErrorMessage, B as typedBoolean, b as formatDate } from "./misc-CQO4K9rH.js";
import "@sentry/react-router";
import "md5-hash";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "emoji-regex";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-Bsg0upig.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
const handle = {
  getSitemapEntries: () => null
};
const DEFAULT_LIMIT = 100;
const TREND_DAYS = 14;
const dayKeyFormat = "yyyy-MM-dd";
function buildDailySeries({
  start,
  days,
  entries
}) {
  const counts = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const key = typeof entry.day === "string" ? entry.day : format(entry.day, dayKeyFormat);
    const count = typeof entry.count === "bigint" ? Number(entry.count) : entry.count;
    counts.set(key, (counts.get(key) ?? 0) + count);
  }
  return Array.from({
    length: days
  }, (_, index) => {
    const day = addDays(start, index);
    const key = format(day, dayKeyFormat);
    return {
      label: format(day, "MMM d"),
      count: counts.get(key) ?? 0
    };
  });
}
const isSortOrder = (s) => s === "asc" || s === "desc";
const isOrderField = (s) => s === "team" || s === "id" || s === "email" || s === "firstName" || s === "createdAt" || s === "role";
async function getLoaderData({
  request
}) {
  const {
    searchParams
  } = new URL(request.url);
  const query = searchParams.get("q");
  const select = {
    createdAt: true,
    firstName: true,
    email: true,
    id: true,
    team: true,
    role: true
  };
  let order = "asc";
  let orderField = "createdAt";
  const spOrder = searchParams.get("order");
  const spOrderField = searchParams.get("orderField");
  if (isSortOrder(spOrder)) order = spOrder;
  if (isOrderField(spOrderField)) orderField = spOrderField;
  const limitParam = Number(searchParams.get("limit") ?? DEFAULT_LIMIT);
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : DEFAULT_LIMIT;
  const now = /* @__PURE__ */ new Date();
  const today = startOfDay(now);
  const start7 = subDays(today, 6);
  const startPrev7 = subDays(today, 13);
  const start30 = subDays(today, 29);
  const trendStart = subDays(today, TREND_DAYS - 1);
  const [users, totalUsers, newUsers7, newUsersPrev7, newUsers30, passkeyCount, activeSessions, totalCalls, calls30, postReads7, postReads30, signupDailyCounts, readDailyCounts, teamCountsRaw, roleCountsRaw, topPostsRaw] = await Promise.all([prisma.user.findMany({
    where: query ? {
      OR: [{
        firstName: {
          contains: query
        }
      }, {
        email: {
          contains: query
        }
      }, {
        id: {
          contains: query
        }
      }, isTeam(query) ? {
        team: {
          equals: query
        }
      } : null].filter(typedBoolean)
    } : {},
    select,
    orderBy: {
      [orderField]: order
    },
    take: limit
  }), prisma.user.count(), prisma.user.count({
    where: {
      createdAt: {
        gte: start7
      }
    }
  }), prisma.user.count({
    where: {
      createdAt: {
        gte: startPrev7,
        lt: start7
      }
    }
  }), prisma.user.count({
    where: {
      createdAt: {
        gte: start30
      }
    }
  }), prisma.passkey.count(), prisma.session.count({
    where: {
      expirationDate: {
        gt: now
      }
    }
  }), prisma.call.count(), prisma.call.count({
    where: {
      createdAt: {
        gte: start30
      }
    }
  }), prisma.postRead.count({
    where: {
      createdAt: {
        gte: start7
      }
    }
  }), prisma.postRead.count({
    where: {
      createdAt: {
        gte: start30
      }
    }
  }), prisma.$queryRaw`
			SELECT DATE("createdAt", 'localtime') AS day, COUNT(*) AS count
			FROM "User"
			WHERE DATE("createdAt", 'localtime') >= DATE(${trendStart}, 'localtime')
			GROUP BY DATE("createdAt", 'localtime')
			ORDER BY day ASC
		`, prisma.$queryRaw`
			SELECT DATE("createdAt", 'localtime') AS day, COUNT(*) AS count
			FROM "PostRead"
			WHERE DATE("createdAt", 'localtime') >= DATE(${trendStart}, 'localtime')
			GROUP BY DATE("createdAt", 'localtime')
			ORDER BY day ASC
		`, prisma.user.groupBy({
    by: ["team"],
    _count: {
      team: true
    },
    orderBy: {
      _count: {
        team: "desc"
      }
    }
  }), prisma.user.groupBy({
    by: ["role"],
    _count: {
      role: true
    },
    orderBy: {
      _count: {
        role: "desc"
      }
    }
  }), prisma.postRead.groupBy({
    by: ["postSlug"],
    _count: {
      postSlug: true
    },
    where: {
      createdAt: {
        gte: start7
      }
    },
    orderBy: {
      _count: {
        postSlug: "desc"
      }
    },
    take: 5
  })]);
  const signupTrend = buildDailySeries({
    start: trendStart,
    days: TREND_DAYS,
    entries: signupDailyCounts
  });
  const readsTrend = buildDailySeries({
    start: trendStart,
    days: TREND_DAYS,
    entries: readDailyCounts
  });
  const teamCounts = teamCountsRaw.map((item) => ({
    team: item.team,
    count: item._count.team
  }));
  const topTeams = teamCounts.slice(0, 5);
  const otherTeamsCount = teamCounts.slice(5).reduce((total, item) => total + item.count, 0);
  const teamMix = otherTeamsCount > 0 ? [...topTeams, {
    team: "Other",
    count: otherTeamsCount
  }] : topTeams;
  const roleMix = roleCountsRaw.map((item) => ({
    role: item.role,
    count: item._count.role
  }));
  const topPosts = topPostsRaw.map((item) => ({
    slug: item.postSlug,
    count: item._count.postSlug
  }));
  const growth7 = newUsersPrev7 === 0 ? null : Math.round((newUsers7 - newUsersPrev7) / newUsersPrev7 * 100);
  return {
    users: users.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt)
    })),
    stats: {
      totalUsers,
      totalTeams: teamCountsRaw.length,
      newUsers7,
      newUsers30,
      newUsersPrev7,
      growth7,
      passkeyCount,
      activeSessions,
      totalCalls,
      calls30,
      postReads7,
      postReads30,
      teamMix,
      roleMix,
      topPosts,
      signupTrend,
      readsTrend,
      generatedAt: format(now, "MMM d, yyyy h:mm a")
    }
  };
}
async function loader({
  request
}) {
  await requireAdminUser(request);
  return data(await getLoaderData({
    request
  }));
}
async function action({
  request
}) {
  await requireAdminUser(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  try {
    const {
      id,
      ...values
    } = Object.fromEntries(form);
    if (!id) return data({
      error: "id is required"
    }, {
      status: 400
    });
    if (request.method === "DELETE") {
      await prisma.user.delete({
        where: {
          id
        }
      });
    } else {
      await prisma.user.update({
        where: {
          id
        },
        data: values
      });
    }
  } catch (error) {
    console.error(error);
    return data({
      error: getErrorMessage(error)
    });
  }
  return redirect(new URL(request.url).pathname);
}
const userColumns = [{
  Header: "Created",
  accessor: "createdAt"
}, {
  Header: "ID",
  accessor: "id"
}, {
  Header: "First Name",
  accessor: "firstName"
}, {
  Header: "Team",
  accessor: "team"
}, {
  Header: "Role",
  accessor: "role"
}, {
  Header: "Email",
  accessor: "email"
}];
function Cell({
  value,
  row: {
    values: user
  },
  column: {
    id: propertyName
  }
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const dc = useDoubleCheck();
  return isEditing ? propertyName === "id" ? /* @__PURE__ */ jsxs(Form, {
    method: "delete",
    onSubmit: () => setIsEditing(false),
    onBlur: () => setIsEditing(false),
    onKeyUp: (e) => {
      if (e.key === "Escape") setIsEditing(false);
    },
    children: [/* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "id",
      value: user.id
    }), /* @__PURE__ */ jsx(Button, {
      type: "submit",
      variant: "danger",
      autoFocus: true,
      ...dc.getButtonProps(),
      children: dc.doubleCheck ? "You sure?" : "Delete"
    })]
  }) : /* @__PURE__ */ jsxs(Form, {
    method: "POST",
    onSubmit: () => setIsEditing(false),
    onBlur: () => setIsEditing(false),
    onKeyUp: (e) => {
      if (e.key === "Escape") setIsEditing(false);
    },
    children: [/* @__PURE__ */ jsx("input", {
      type: "hidden",
      name: "id",
      value: user.id
    }), /* @__PURE__ */ jsx("input", {
      type: "text",
      defaultValue: value,
      name: propertyName,
      autoFocus: true
    })]
  }) : /* @__PURE__ */ jsx("button", {
    className: "border-none",
    onClick: () => setIsEditing(true),
    children: value || "NO_VALUE"
  });
}
const defaultColumn = {
  Cell
};
const cardClassName = "rounded-2xl bg-gray-100 p-6 ring-1 ring-inset ring-[rgba(0,0,0,0.05)] dark:bg-gray-850 dark:ring-[rgba(255,255,255,0.05)]";
function Card({
  children,
  className
}) {
  return /* @__PURE__ */ jsx("div", {
    className: clsx(cardClassName, className),
    children
  });
}
function TrendBadge({
  value,
  label
}) {
  const tone = value === null ? "bg-slate-200 text-slate-600 dark:bg-slate-700/60 dark:text-slate-200" : value > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200" : value < 0 ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200" : "bg-slate-200 text-slate-600 dark:bg-slate-700/60 dark:text-slate-200";
  return /* @__PURE__ */ jsx("span", {
    className: clsx("rounded-full px-2 py-1 text-xs font-semibold", tone),
    children: label
  });
}
function StatCard({
  label,
  value,
  helper,
  trend
}) {
  return /* @__PURE__ */ jsxs(Card, {
    className: "flex h-full flex-col justify-between gap-3",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex items-start justify-between gap-3",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase",
        children: label
      }), trend ? /* @__PURE__ */ jsx(TrendBadge, {
        value: trend.value,
        label: trend.label
      }) : null]
    }), /* @__PURE__ */ jsx("p", {
      className: "text-3xl font-semibold text-black dark:text-white",
      children: formatNumber(value)
    }), helper ? /* @__PURE__ */ jsx("p", {
      className: "text-sm text-slate-500 dark:text-slate-300",
      children: helper
    }) : null]
  });
}
function Sparkline({
  data: data2
}) {
  if (data2.length === 0) {
    return /* @__PURE__ */ jsx("p", {
      className: "text-sm text-slate-500 dark:text-slate-300",
      children: "No data."
    });
  }
  const max = Math.max(...data2, 1);
  const lastIndex = Math.max(1, data2.length - 1);
  const points = data2.map((value, index) => {
    const x = index / lastIndex * 100;
    const y = 100 - value / max * 100;
    return `${x},${y}`;
  }).join(" ");
  return /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 100 100",
    className: "h-24 w-full",
    preserveAspectRatio: "none",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("polyline", {
      points,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      className: "text-indigo-500"
    })
  });
}
function BarSparkline({
  data: data2
}) {
  if (data2.length === 0) {
    return /* @__PURE__ */ jsx("p", {
      className: "text-sm text-slate-500 dark:text-slate-300",
      children: "No data."
    });
  }
  const max = Math.max(...data2, 1);
  return /* @__PURE__ */ jsx("div", {
    className: "flex h-24 items-end gap-1",
    children: data2.map((value, index) => /* @__PURE__ */ jsx("div", {
      className: "flex-1 rounded-sm bg-sky-500/70",
      style: {
        height: `${value / max * 100}%`
      }
    }, `bar-${index}`))
  });
}
function BarList({
  items,
  labelClassName
}) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("p", {
      className: "text-sm text-slate-500 dark:text-slate-300",
      children: "No data to display."
    });
  }
  const max = Math.max(...items.map((item) => item.count), 1);
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-3",
    children: items.map((item) => /* @__PURE__ */ jsxs("div", {
      className: "flex items-center gap-3",
      children: [/* @__PURE__ */ jsx("span", {
        className: clsx("w-24 truncate text-sm text-slate-600 dark:text-slate-300", labelClassName),
        children: item.label
      }), /* @__PURE__ */ jsx("div", {
        className: "flex-1",
        children: /* @__PURE__ */ jsx("div", {
          className: "h-2 rounded-full bg-slate-200/80 dark:bg-slate-700/60",
          children: /* @__PURE__ */ jsx("div", {
            className: "h-2 rounded-full bg-indigo-500",
            style: {
              width: `${item.count / max * 100}%`
            }
          })
        })
      }), /* @__PURE__ */ jsx("span", {
        className: "w-12 text-right text-sm text-slate-600 dark:text-slate-200",
        children: formatNumber(item.count)
      })]
    }, item.label))
  });
}
const me__admin = UNSAFE_withComponentProps(function MeAdmin({
  loaderData: data2,
  actionData
}) {
  const searchInputRef = React.useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [limit, setLimit] = React.useState(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const spOrder = searchParams.get("order");
  const spOrderField = searchParams.get("orderField");
  const [ordering, setOrdering] = React.useState({
    order: isSortOrder(spOrder) ? spOrder : "asc",
    field: isOrderField(spOrderField) ? spOrderField : "createdAt"
  });
  const syncSearchParams = useDebounce(() => {
    if (searchParams.get("q") === query && searchParams.get("limit") === limit) {
      return;
    }
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("q", query);
    } else {
      newParams.delete("q");
    }
    if (limit && limit !== String(DEFAULT_LIMIT)) {
      newParams.set("limit", limit);
    } else {
      newParams.delete("limit");
    }
    setSearchParams(newParams, {
      replace: true
    });
  }, 400);
  React.useEffect(() => {
    syncSearchParams();
  }, [query, limit, syncSearchParams]);
  React.useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (ordering.field === "createdAt") {
      newParams.delete("orderField");
    } else {
      newParams.set("orderField", ordering.field);
    }
    if (ordering.order === "asc") {
      newParams.delete("order");
    } else {
      newParams.set("order", ordering.order);
    }
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, {
        replace: true
      });
    }
  }, [ordering, searchParams, setSearchParams]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = (
    // @ts-expect-error 🤷‍♂️ no idea why defaultColumn isn't work ing here...
    useTable({
      columns: userColumns,
      data: data2.users,
      defaultColumn
    })
  );
  const stats = data2.stats;
  const signupCounts = stats.signupTrend.map((point) => point.count);
  const readsCounts = stats.readsTrend.map((point) => point.count);
  const signupTotal = stats.signupTrend.reduce((total, point) => total + point.count, 0);
  const readsTotal = stats.readsTrend.reduce((total, point) => total + point.count, 0);
  const signupFirstLabel = stats.signupTrend[0]?.label ?? "";
  const signupLastLabel = stats.signupTrend[stats.signupTrend.length - 1]?.label ?? "";
  const readsFirstLabel = stats.readsTrend[0]?.label ?? "";
  const readsLastLabel = stats.readsTrend[stats.readsTrend.length - 1]?.label ?? "";
  const growthLabel = stats.growth7 === null ? "No prior week" : `${stats.growth7 > 0 ? "+" : ""}${stats.growth7}% vs last week`;
  const teamItems = stats.teamMix.map((item) => ({
    label: isTeam(item.team) ? teamDisplay[item.team] : item.team,
    count: item.count
  }));
  const roleItems = stats.roleMix.map((item) => ({
    label: `${item.role.slice(0, 1)}${item.role.slice(1).toLowerCase()}`,
    count: item.count
  }));
  const postItems = stats.topPosts.map((item) => ({
    label: item.slug,
    count: item.count
  }));
  return /* @__PURE__ */ jsxs(Grid, {
    rowGap: true,
    children: [/* @__PURE__ */ jsx("div", {
      className: "col-span-full",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsx(H1, {
            children: "Admin dashboard"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-slate-500 dark:text-slate-300",
            children: "User growth, engagement, and access signals in one place."
          })]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-xs text-slate-500 dark:text-slate-300",
          children: ["Updated ", stats.generatedAt]
        })]
      })
    }), actionData?.error ? /* @__PURE__ */ jsx("p", {
      role: "alert",
      className: "col-span-full text-sm text-red-500",
      children: actionData.error
    }) : null, /* @__PURE__ */ jsx("div", {
      className: "col-span-full",
      children: /* @__PURE__ */ jsx(H2, {
        children: "Overview"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full md:col-span-4 lg:col-span-3",
      children: /* @__PURE__ */ jsx(StatCard, {
        label: "Total users",
        value: stats.totalUsers,
        helper: `${formatNumber(stats.totalTeams)} teams`
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full md:col-span-4 lg:col-span-3",
      children: /* @__PURE__ */ jsx(StatCard, {
        label: "New users (7d)",
        value: stats.newUsers7,
        helper: `Prev 7d: ${formatNumber(stats.newUsersPrev7)}`,
        trend: {
          value: stats.growth7,
          label: growthLabel
        }
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full md:col-span-4 lg:col-span-3",
      children: /* @__PURE__ */ jsx(StatCard, {
        label: "New users (30d)",
        value: stats.newUsers30,
        helper: "Last 30 days"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full md:col-span-4 lg:col-span-3",
      children: /* @__PURE__ */ jsx(StatCard, {
        label: "Active sessions",
        value: stats.activeSessions,
        helper: "Not expired"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full md:col-span-4 lg:col-span-3",
      children: /* @__PURE__ */ jsx(StatCard, {
        label: "Passkeys",
        value: stats.passkeyCount,
        helper: "Registered"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full md:col-span-4 lg:col-span-3",
      children: /* @__PURE__ */ jsx(StatCard, {
        label: "Total calls",
        value: stats.totalCalls,
        helper: `Last 30d: ${formatNumber(stats.calls30)}`
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full md:col-span-4 lg:col-span-3",
      children: /* @__PURE__ */ jsx(StatCard, {
        label: "Reads (7d)",
        value: stats.postReads7,
        helper: `Last 30d: ${formatNumber(stats.postReads30)}`
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full",
      children: /* @__PURE__ */ jsx(H2, {
        children: "Trends"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full lg:col-span-7",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "flex h-full flex-col gap-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap items-start justify-between gap-3",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase",
              children: "Signups"
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-lg font-semibold text-black dark:text-white",
              children: [formatNumber(signupTotal), " in last ", TREND_DAYS, " days"]
            })]
          }), /* @__PURE__ */ jsx(TrendBadge, {
            value: stats.growth7,
            label: growthLabel
          })]
        }), /* @__PURE__ */ jsx(Sparkline, {
          data: signupCounts
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between text-xs text-slate-500 dark:text-slate-300",
          children: [/* @__PURE__ */ jsx("span", {
            children: signupFirstLabel
          }), /* @__PURE__ */ jsx("span", {
            children: signupLastLabel
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full lg:col-span-5",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "flex h-full flex-col gap-6",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase",
            children: "Post reads"
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-lg font-semibold text-black dark:text-white",
            children: [formatNumber(readsTotal), " in last ", TREND_DAYS, " days"]
          })]
        }), /* @__PURE__ */ jsx(BarSparkline, {
          data: readsCounts
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between text-xs text-slate-500 dark:text-slate-300",
          children: [/* @__PURE__ */ jsx("span", {
            children: readsFirstLabel
          }), /* @__PURE__ */ jsx("span", {
            children: readsLastLabel
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full lg:col-span-6",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "flex h-full flex-col gap-6",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase",
            children: "Team mix"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg font-semibold text-black dark:text-white",
            children: "Distribution by team"
          })]
        }), /* @__PURE__ */ jsx(BarList, {
          items: teamItems
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full lg:col-span-6",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "flex h-full flex-col gap-6",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase",
            children: "Roles"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg font-semibold text-black dark:text-white",
            children: "Access distribution"
          })]
        }), /* @__PURE__ */ jsx(BarList, {
          items: roleItems
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "flex flex-col gap-6",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase",
            children: "Top posts"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg font-semibold text-black dark:text-white",
            children: "Most read in the last 7 days"
          })]
        }), /* @__PURE__ */ jsx(BarList, {
          items: postItems,
          labelClassName: "w-48"
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full",
      children: /* @__PURE__ */ jsx(H2, {
        children: "User management"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "col-span-full",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "flex flex-col gap-6",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex flex-wrap items-center justify-between gap-3",
          children: /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx(H3, {
              className: "text-xl",
              children: "Users"
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-sm text-slate-500 dark:text-slate-300",
              children: ["Showing ", formatNumber(rows.length), " of", " ", formatNumber(stats.totalUsers), " users"]
            })]
          })
        }), /* @__PURE__ */ jsx(Form, {
          method: "get",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-4 lg:flex-row lg:items-end",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex-1",
              children: /* @__PURE__ */ jsxs("div", {
                className: "relative flex-1",
                children: [/* @__PURE__ */ jsx("button", {
                  title: query === "" ? "Search" : "Clear search",
                  type: "button",
                  onClick: () => {
                    setQuery("");
                    syncSearchParams();
                    searchInputRef.current?.focus();
                  },
                  className: clsx("absolute top-0 left-6 flex h-full items-center justify-center border-none bg-transparent p-0 text-slate-500", {
                    "cursor-pointer": query !== "",
                    "cursor-default": query === ""
                  }),
                  children: /* @__PURE__ */ jsx(SearchIcon, {})
                }), /* @__PURE__ */ jsx("input", {
                  ref: searchInputRef,
                  type: "search",
                  value: query,
                  onChange: (event) => setQuery(event.currentTarget.value),
                  name: "q",
                  placeholder: "Filter users",
                  className: "text-primary bg-primary border-secondary focus:bg-secondary hover:border-team-current focus:border-team-current w-full rounded-full border py-6 pr-6 pl-14 text-lg font-medium focus:outline-none md:pr-24"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute top-0 right-2 flex h-full w-14 items-center justify-between text-lg font-medium text-slate-500",
                  children: /* @__PURE__ */ jsx("span", {
                    title: "Total results shown",
                    children: rows.length
                  })
                })]
              })
            }), /* @__PURE__ */ jsx(Field, {
              label: "Limit",
              name: "limit",
              value: limit,
              type: "number",
              step: "1",
              min: "1",
              max: "10000",
              onChange: (event) => setLimit(event.currentTarget.value),
              placeholder: "results limit"
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            ...getTableProps({
              className: "min-w-[900px] w-full border-separate border-spacing-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700"
            }),
            children: [/* @__PURE__ */ jsx("thead", {
              className: "bg-white/40 dark:bg-gray-900/40",
              children: headerGroups.map((headerGroup) => /* @__PURE__ */ jsx("tr", {
                ...headerGroup.getHeaderGroupProps(),
                children: headerGroup.headers.map((column) => /* @__PURE__ */ jsx("th", {
                  ...column.getHeaderProps({
                    className: "border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200"
                  }),
                  children: /* @__PURE__ */ jsxs("button", {
                    className: "flex w-full items-center gap-1",
                    onClick: () => {
                      setOrdering((prev) => {
                        const field = column.id;
                        if (!isOrderField(field)) return prev;
                        if (prev.field === column.id) {
                          return {
                            field,
                            order: prev.order === "asc" ? "desc" : "asc"
                          };
                        } else {
                          return {
                            field,
                            order: "asc"
                          };
                        }
                      });
                    },
                    children: [column.render("Header"), ordering.order === "asc" ? /* @__PURE__ */ jsx(ChevronUpIcon, {
                      title: "Asc",
                      className: clsx("ml-2 text-gray-400", {
                        "opacity-0": ordering.field !== column.id
                      })
                    }) : /* @__PURE__ */ jsx(ChevronDownIcon, {
                      title: "Desc",
                      className: clsx("ml-2 text-gray-400", {
                        "opacity-0": ordering.field !== column.id
                      })
                    })]
                  })
                }))
              }))
            }), /* @__PURE__ */ jsx("tbody", {
              ...getTableBodyProps(),
              children: rows.map((row) => {
                prepareRow(row);
                return /* @__PURE__ */ jsx("tr", {
                  ...row.getRowProps(),
                  className: "odd:bg-white/60 even:bg-slate-50/60 dark:odd:bg-gray-900/50 dark:even:bg-gray-950/40",
                  children: row.cells.map((cell) => {
                    return /* @__PURE__ */ jsx("td", {
                      ...cell.getCellProps({
                        className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-200"
                      }),
                      children: cell.render("Cell")
                    });
                  })
                });
              })
            })]
          })
        })]
      })
    })]
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
  action,
  me__admin as default,
  handle,
  loader
};
