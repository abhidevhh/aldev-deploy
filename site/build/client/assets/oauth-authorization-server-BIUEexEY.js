import { data } from "react-router";
async function loader() {
  const result = await fetch("https://kcd-oauth-provider.abhidev.workers.dev/.well-known/oauth-authorization-server");
  if (!result.ok) {
    return result;
  }
  const data$1 = await result.json();
  return data(data$1);
}
export {
  loader
};
//# sourceMappingURL=oauth-authorization-server-BIUEexEY.js.map
