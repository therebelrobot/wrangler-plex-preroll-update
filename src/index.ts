/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}
const ___ = undefined;

const READ_KEY = "fc8101a7-3914-4429-bd54-c7113f4d0671";

const Authorization = `Bearer ${READ_KEY}`;

const URLS = {
  GET_COLUMNS: "columns",
  GET_ROWS: "rows",
  BREAKFAST:
    "gAAAAABjM1BWVR9rh26DVi1VwazvCAn3VcMZPk-WKTWRGe-4ENSJYvp-exroElxYzlXNY6CdDFL2d9gcfvdF4m2tmUbv7zbYt-9I7Ze3CWdT-b-Ri29ZfQNqOUiugFcW5VvZDewvFhBjFwOU9-pRZJUg1I8nHRW_FnBHJskYCF1urFfctEOJiew=",
  LUNCH:
    "gAAAAABjNb7hVmybvIYCcrQXaZfSdNjTgXtC7xpPreb4vYDoaUYjn2nIfJ-fwmG35Ur2eF9bSBuyWgs7lHQc_zI2J8jAD8OAsf_f7iyYPE1Y0V-ALWXTuEumxQmtj2X4ofw0qvsBcclwJWANCUC3Fm7y7LXcnNclqmPVal8EkJgz20WqoRRg9po=",
  DINNER:
    "gAAAAABjNb7ncdcdGbbhLai8ljRMYasxQ_gPhpgSCtaS3l4QweWCl5o58Ug3bK-SvlPt_HNoSxh8S-rISGwtbVPeuPSiXYDV7vHBKiLPi7MsMBqBvDBt5gfW00J3NqcHhmmksutFcF3lGsHYydtwmI_O_a5oFMvljVZxJ-WPoAMeRU5VR1gxl0o=",
  ACTION:
    "gAAAAABjNb9heb0AimDOMlvn0hy7wWGJ1sZGgZaBC2dUx9SuLMkpUsumLmMMjaoao0NlcjRh1ufeYSconciBweqbjZbPZGeydVN2BU6ruF2JYyIi41c2TDc6CbylJQq0jOo9mLmiD00HBwkfv_eTvq9ZtuYqi_5oEh2cqzAb6TwROkwM1kN1O5M=",
};

const BASE_URLS = {
  CODA: "https://coda.io/apis/v1/docs/Z73AjdCK_A/tables/grid--PMhbfCDXg/",
  HA: "https://hooks.nabu.casa/",
};

const options = {
  headers: {
    Authorization,
    "content-type": "application/json;charset=UTF-8",
  },
};

const MEALS = ["breakfast", "lunch", "dinner", "action"];

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response: any) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

const getJSON = async (url: string, overrideOptions = {}) => {
  const response = await fetch(url, { ...options, ...overrideOptions });
  const json = await gatherResponse(response);
  return json;
};

const runHandler = async (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext
): Promise<any> => {
  const columns = await getJSON(`${BASE_URLS.CODA}${URLS.GET_COLUMNS}`);
  console.log(columns);
  const columnNames: any = {};

  const rows = await getJSON(`${BASE_URLS.CODA}${URLS.GET_ROWS}`);
  console.log(rows.items[0].values);
  const data: any = {};
  await Promise.all(
    MEALS.map(async (meal) => {
      columnNames[meal] = columns.items.find(
        (item: any) => item.name === meal
      ).id;
      data[meal] = rows.items[0].values[columnNames[meal]]
        .split("\n")
        .join("<br/><br/>")
        .split(",")
        .join("<br/>");
      console.log(data[meal].length);
      const mealData = new URLSearchParams();
      mealData.append("data", data[meal].substring(0, 255));
      await fetch(`${BASE_URLS.HA}${URLS[meal.toUpperCase()]}`, {
        method: "POST",
        body: mealData,
      });
    })
  );
  return JSON.stringify("success");
};

export default {
  async scheduled(...props: any[]): Promise<void> {
    await runHandler(...props);
  },
  async fetch(...props: any[]) {
    const results = await runHandler(...props);
    return new Response(results, options);
  },
};
