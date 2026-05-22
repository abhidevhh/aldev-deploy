import { i as images, a as getImageBuilder } from "./images-D8NqauwH.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { c as cachified, b as cache } from "./cache.server-BWnHcoUK.js";
import { j as getTeam, q as getOptionalTeam } from "./misc-DM3BUXHg.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { f as fetchWithTimeout } from "./fetch-with-timeout.server-BL1zZ7UJ.js";
import { d as getAvatar } from "./misc-react-D8yAGzlT.js";
function getKitAuth() {
  const env = getEnv();
  return { apiSecret: env.KIT_API_SECRET, apiKey: env.KIT_API_KEY };
}
async function getKitSubscriber(email) {
  const { apiSecret } = getKitAuth();
  const url = new URL("https://api.kit.com/v3/subscribers");
  url.searchParams.set("api_secret", apiSecret);
  url.searchParams.set("email_address", email);
  const resp = await fetch(url.toString());
  const json = await resp.json();
  const { subscribers: [subscriber = { state: "inactive" }] = [] } = json;
  return subscriber.state === "active" ? subscriber : null;
}
async function getKitSubscriberTags(subscriberId) {
  const { apiSecret } = getKitAuth();
  const url = new URL(`https://api.kit.com/v3/subscribers/${subscriberId}/tags`);
  url.searchParams.set("api_secret", apiSecret);
  const resp = await fetch(url.toString());
  const json = await resp.json();
  return json.tags;
}
async function ensureSubscriber({
  email,
  firstName
}) {
  let subscriber = await getKitSubscriber(email);
  if (!subscriber) {
    subscriber = await addSubscriberToForm({
      email,
      firstName,
      kitFormId: "2500372"
    });
  }
  return subscriber;
}
async function addSubscriberToForm({
  email,
  firstName,
  kitFormId
}) {
  const { apiKey, apiSecret } = getKitAuth();
  const subscriberData = {
    api_key: apiKey,
    api_secret: apiSecret,
    first_name: firstName,
    email
  };
  const response = await fetch(
    `https://api.kit.com/v3/forms/${kitFormId}/subscribe`,
    {
      method: "POST",
      body: JSON.stringify(subscriberData),
      headers: { "Content-Type": "application/json" }
    }
  );
  const json = await response.json();
  return json.subscription.subscriber;
}
async function addTagToSubscriber({
  email,
  firstName,
  kitTagId
}) {
  await ensureSubscriber({ email, firstName });
  const { apiKey, apiSecret } = getKitAuth();
  const subscriberData = {
    api_key: apiKey,
    api_secret: apiSecret,
    first_name: firstName,
    email
  };
  const subscribeUrl = `https://api.kit.com/v3/tags/${kitTagId}/subscribe`;
  const response = await fetch(subscribeUrl, {
    method: "POST",
    body: JSON.stringify(subscriberData),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const json = await response.json();
  return json.subscription.subscriber;
}
async function tagKCDSiteSubscriber({
  email,
  firstName,
  fields
}) {
  const subscriber = await getKitSubscriber(email);
  const kcdTagId = "2466369";
  const kcdSiteForm = "2393887";
  const { apiKey, apiSecret } = getKitAuth();
  const subscriberData = {
    api_key: apiKey,
    api_secret: apiSecret,
    first_name: firstName,
    email,
    fields
  };
  const subscribeUrl = subscriber ? `https://api.kit.com/v3/tags/${kcdTagId}/subscribe` : `https://api.kit.com/v3/forms/${kcdSiteForm}/subscribe`;
  const updatedRes = await fetch(subscribeUrl, {
    method: "POST",
    body: JSON.stringify(subscriberData),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const updatedJson = await updatedRes.json();
  return updatedJson.subscription.subscriber;
}
function getDiscordConfig() {
  const env = getEnv();
  return {
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    scopes: env.DISCORD_SCOPES,
    botToken: env.DISCORD_BOT_TOKEN,
    guildId: env.DISCORD_GUILD_ID,
    memberRole: env.DISCORD_MEMBER_ROLE,
    roleByTeam: {
      RED: env.DISCORD_RED_ROLE,
      YELLOW: env.DISCORD_YELLOW_ROLE,
      BLUE: env.DISCORD_BLUE_ROLE
    }
  };
}
async function fetchAsDiscordBot(endpoint, config) {
  const { botToken } = getDiscordConfig();
  const url = new URL(`https://discord.com/api/${endpoint}`);
  const res = await fetch(url.toString(), {
    ...config,
    headers: {
      Authorization: `Bot ${botToken}`,
      ...config?.headers
    }
  });
  return res;
}
async function fetchJsonAsDiscordBot(endpoint, config) {
  const res = await fetchAsDiscordBot(endpoint, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers
    }
  });
  const json = await res.json();
  return json;
}
async function sendMessageFromDiscordBot(channelId, content) {
  await fetchAsDiscordBot(`channels/${channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: { "Content-Type": "application/json" }
  });
}
async function getUserToken({
  code,
  domainUrl
}) {
  const { clientId, clientSecret, scopes } = getDiscordConfig();
  const tokenUrl = new URL("https://discord.com/api/oauth2/token");
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: `${domainUrl}/discord/callback`,
    scope: scopes
  });
  const tokenRes = await fetch(tokenUrl.toString(), {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  const discordToken = await tokenRes.json();
  const userUrl = new URL("https://discord.com/api/users/@me");
  const userRes = await fetch(userUrl.toString(), {
    headers: {
      authorization: `${discordToken.token_type} ${discordToken.access_token}`
    }
  });
  const discordUser = await userRes.json();
  return { discordUser, discordToken };
}
async function getDiscordUser(discordUserId) {
  const user = await fetchJsonAsDiscordBot(
    `users/${discordUserId}`
  );
  return user;
}
async function getMember(discordUserId) {
  const { guildId } = getDiscordConfig();
  const member = await fetchJsonAsDiscordBot(
    `guilds/${guildId}/members/${discordUserId}`
  );
  return member;
}
async function updateDiscordRolesForUser(discordMember, user) {
  await prisma.user.update({
    where: { id: user.id },
    data: { discordId: discordMember.user.id }
  });
  const team = getTeam(user.team);
  if (!team) {
    return;
  }
  const { guildId, memberRole, roleByTeam } = getDiscordConfig();
  const teamRole = roleByTeam[team];
  if (!discordMember.roles.includes(teamRole)) {
    await fetchAsDiscordBot(
      `guilds/${guildId}/members/${discordMember.user.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          roles: Array.from(
            /* @__PURE__ */ new Set([...discordMember.roles, memberRole, teamRole])
          )
        }),
        // note using fetchJsonAsDiscordBot because this API doesn't return JSON.
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
async function addUserToDiscordServer(discordUser, discordToken) {
  const { guildId } = getDiscordConfig();
  await fetchAsDiscordBot(`guilds/${guildId}/members/${discordUser.id}`, {
    method: "PUT",
    body: JSON.stringify({ access_token: discordToken.access_token }),
    headers: { "Content-Type": "application/json" }
  });
}
async function connectDiscord({
  user,
  code,
  domainUrl
}) {
  const { discordUser, discordToken } = await getUserToken({ code, domainUrl });
  await addUserToDiscordServer(discordUser, discordToken);
  await new Promise((resolve) => setTimeout(resolve, 300));
  const discordMember = await getMember(discordUser.id);
  if ("user" in discordMember) {
    await updateDiscordRolesForUser(discordMember, user);
  } else if ("message" in discordMember) {
    throw new Error(
      `Discord Error (${discordMember.code}): ${discordMember.message}`
    );
  }
  return discordMember;
}
async function gravatarExistsForEmail({
  email,
  request,
  timings,
  forceFresh
}) {
  return cachified({
    key: `gravatar-exists-for:${email}`,
    cache,
    request,
    timings,
    forceFresh,
    ttl: 1e3 * 60 * 60 * 24 * 90,
    staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 365,
    checkValue: (prevValue) => typeof prevValue === "boolean",
    getFreshValue: async (context) => {
      const gravatarUrl = getAvatar(email, { fallback: "404" });
      try {
        const timeoutMs = context.background || forceFresh ? 1e3 * 10 : 100;
        const avatarResponse = await fetchWithTimeout(
          gravatarUrl,
          { method: "HEAD" },
          timeoutMs
        );
        if (avatarResponse.status === 200) {
          context.metadata.ttl = 1e3 * 60 * 60 * 24 * 365;
          return true;
        } else {
          context.metadata.ttl = 1e3 * 60;
          return false;
        }
      } catch (error) {
        console.error(`Error getting gravatar for ${email}:`, error);
        context.metadata.ttl = 1e3 * 60;
        return false;
      }
    }
  });
}
async function getDirectAvatarForUser({ email, team }, {
  size = 128,
  request,
  timings,
  forceFresh
}) {
  const hasGravatar = await gravatarExistsForEmail({
    email,
    request,
    timings,
    forceFresh
  });
  if (hasGravatar) {
    return { hasGravatar, avatar: getAvatar(email, { size, fallback: null }) };
  } else {
    const imageProfileIds = {
      RED: images.abhiBuddyProfileRed.id,
      BLUE: images.abhiBuddyProfileBlue.id,
      YELLOW: images.abhiBuddyProfileYellow.id,
      UNKNOWN: images.abhiBuddyProfileGray.id
    };
    return {
      hasGravatar,
      avatar: getImageBuilder(imageProfileIds[getOptionalTeam(team)])({
        resize: {
          type: "pad",
          width: size,
          height: size
        }
      })
    };
  }
}
const getKitCacheKey = (kitId) => `kit:${kitId}`;
const getDiscordCacheKey = (discordId) => `discord:${discordId}`;
async function getUserInfo(user, {
  request,
  forceFresh,
  timings
}) {
  const { discordId, kitId, email } = user;
  const [discordUser, kitInfo] = await Promise.all([
    discordId ? cachified({
      cache,
      request,
      timings,
      forceFresh,
      ttl: 1e3 * 60 * 60 * 24 * 30,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      key: getDiscordCacheKey(discordId),
      checkValue: (value) => typeof value === "object" && value !== null && "id" in value,
      getFreshValue: async () => {
        const result = await getDiscordUser(discordId);
        return result;
      }
    }) : null,
    kitId ? cachified({
      cache,
      request,
      timings,
      forceFresh,
      ttl: 1e3 * 60 * 60 * 24 * 30,
      staleWhileRevalidate: 1e3 * 60 * 60 * 24 * 30,
      key: getKitCacheKey(kitId),
      checkValue: (value) => typeof value === "object" && value !== null && "tags" in value,
      getFreshValue: async () => {
        const subscriber = await getKitSubscriber(email);
        if (!subscriber) {
          return {
            tags: []
          };
        }
        const tags = await getKitSubscriberTags(subscriber.id);
        return {
          tags: tags.map(({ name, id }) => ({ name, id }))
        };
      }
    }) : null
  ]);
  const { avatar, hasGravatar } = await getDirectAvatarForUser(user, {
    size: 128,
    request,
    timings
  });
  const userInfo = {
    avatar: {
      src: avatar,
      alt: user.firstName,
      hasGravatar
    },
    discord: discordUser,
    kit: kitInfo
  };
  return userInfo;
}
async function deleteKitCache(kitId) {
  await cache.delete(getKitCacheKey(String(kitId)));
}
async function deleteDiscordCache(discordId) {
  await cache.delete(getDiscordCacheKey(discordId));
}
export {
  deleteKitCache as a,
  getUserInfo as b,
  connectDiscord as c,
  deleteDiscordCache as d,
  getDirectAvatarForUser as e,
  addSubscriberToForm as f,
  gravatarExistsForEmail as g,
  addTagToSubscriber as h,
  getKitSubscriber as i,
  sendMessageFromDiscordBot as s,
  tagKCDSiteSubscriber as t
};
//# sourceMappingURL=user-info.server-DQEJabU4.js.map
