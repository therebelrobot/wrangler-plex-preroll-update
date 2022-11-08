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

// https://coda.io/d/Bullet-Journal_dZ73AjdCK_A/PreRoll_suvWE#Plex-preroll-types_tuZW9/r2

const PREROLL_STRINGS = [
  {
    startMonth: 12,
    startDay: 26,
    endMonth: 1,
    endDay: 2,
    list: "/storage/5BC3-F5E6/Prerroll/Gatsby Happy New Year Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Santa Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Tree Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Melting Snow Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Magic Snow_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowflakes Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowman Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Forest LoFi Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Ice Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter is Coming Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Snow Plex Pre-roll_1440_H264.mp4;/storage/5BC3-F5E6/Prerroll/Gatsby Happy New Year Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Santa Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Tree Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Melting Snow Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Magic Snow_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowflakes Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowman Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Forest LoFi Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Ice Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter is Coming Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Snow Plex Pre-roll_1440_H264.mp4;/storage/5BC3-F5E6/Prerroll/TV Glitch Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Monkey Island Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Up Movie Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Monkey Island Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/TV Glitch Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Piracy. It's a crime. Universal Pre-roll_1080_H264;/storage/5BC3-F5E6/Prerroll/Cartoon Ink Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Monkey Island Plex Pre-roll_1080_H264.mp4",
  },
  {
    startMonth: 1,
    startDay: 3,
    endMonth: 2,
    endDay: 14,
    list: "/storage/5BC3-F5E6/Prerroll/Melting Snow Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Magic Snow_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Forest LoFi Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Ice Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter is Coming Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Snow Plex Pre-roll_1440_H264.mp4;/storage/5BC3-F5E6/Prerroll/Melting Snow Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Magic Snow_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Forest LoFi Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Ice Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter is Coming Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Snow Plex Pre-roll_1440_H264.mp4;/storage/5BC3-F5E6/Prerroll/Melting Snow Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Magic Snow_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Forest LoFi Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Ice Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter is Coming Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Snow Plex Pre-roll_1440_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Uber VHS Style Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/Shape Filling Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Developer Coding Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex McDonalds Preroll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/Old Theater Film Intro Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Old Theater Film Intro Plex Pre-roll_720_H264.mp4",
  },
  {
    startMonth: 2,
    startDay: 14,
    endMonth: 2,
    endDay: 15,
    list: "/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Valentines Hearts Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Marvel V2 Shortened Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/HBO Static Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Piracy. It's a crime. Universal Pre-roll_1080_H264;/storage/5BC3-F5E6/Prerroll/Plex Hulu Originals_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Cartoon Ink Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Old Theater Film Intro Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Monkey Island Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/TV Glitch Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/HBO Static Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/21st Century Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Uber VHS Style Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Vibrant Plex Pre-Roll_1080_H264.mp4",
  },
  {
    startMonth: 2,
    startDay: 15,
    endMonth: 5,
    endDay: 31,
    list: "/storage/5BC3-F5E6/Prerroll/Blooming Flower Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Dancing Butterflies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Flower Field Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Growing Grass Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spring Brush Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Summer Splash Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Blooming Flower Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Dancing Butterflies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Flower Field Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Growing Grass Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spring Brush Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Summer Splash Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Blooming Flower Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Dancing Butterflies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Flower Field Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Growing Grass Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spring Brush Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Summer Splash Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/HBO Static Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Old Theater Film Intro Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Marvel V2 Shortened Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/Shape Filling Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Studios_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Studios_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4",
  },
  {
    startMonth: 6,
    startDay: 1,
    endMonth: 6,
    endDay: 30,
    list: "/storage/5BC3-F5E6/Prerroll/Netflix Colorful Lines Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Pride 1080p.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Colorful Lines Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Pride 1080p.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Colorful Lines Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Pride 1080p.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Colorful Lines Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Pride 1080p.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Colorful Lines Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Pride 1080p.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Colorful Lines Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Pride 1080p.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Colorful Lines Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Netflix Pride 1080p.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/21st Century Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Piracy. It's a crime. Universal Pre-roll_1080_H264;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Cartoon Ink Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Marvel V2 Shortened Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/21st Century Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Studios_1080_H264.mp4",
  },
  {
    startMonth: 7,
    startDay: 1,
    endMonth: 8,
    endDay: 31,
    list: "/storage/5BC3-F5E6/Prerroll/Blooming Flower Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Dancing Butterflies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Flower Field Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Growing Grass Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spring Brush Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Summer Splash Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Blooming Flower Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Dancing Butterflies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Flower Field Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Growing Grass Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spring Brush Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Summer Splash Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Blooming Flower Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Dancing Butterflies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Flower Field Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Growing Grass Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spring Brush Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Summer Splash Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/TV Glitch Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro CBS Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Green Energy Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/TV Glitch Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Up Movie Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Piracy. It's a crime. Universal Pre-roll_1080_H264;/storage/5BC3-F5E6/Prerroll/Shape Filling Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Vibrant Plex Pre-Roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Uber VHS Style Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Up Movie Plex Pre-roll_1080_H264.mp4",
  },
  {
    startMonth: 9,
    startDay: 1,
    endMonth: 9,
    endDay: 30,
    list: "/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/TV Glitch Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Up Movie Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/Marvel V2 Shortened Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/HBO Static Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Marvel V2 Shortened Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Modern Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Up Movie Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Cartoon Ink Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4",
  },
  {
    startMonth: 10,
    startDay: 1,
    endMonth: 10,
    endDay: 31,
    list: "/storage/5BC3-F5E6/Prerroll/Garage Screams Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V01 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V02 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V03 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V04 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V05 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V06 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V07 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V08 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Spider Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Happy Halloween Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Horror Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Horror Trailer Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Monster Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Slender Man Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spooky Halloween Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Vampire Bats Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Zombies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Garage Screams Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V01 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V02 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V03 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V04 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V05 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V06 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V07 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Pack V08 Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Halloween Spider Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Happy Halloween Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Horror Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Horror Trailer Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Monster Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Slender Man Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Spooky Halloween Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Vampire Bats Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Zombies Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Shape Filling Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Shape Filling Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Vibrant Plex Pre-Roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4",
  },
  {
    startMonth: 11,
    startDay: 1,
    endMonth: 11,
    endDay: 30,
    list: "/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Happy Thanksgiving Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Happy Thanksgiving Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Happy Thanksgiving Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Happy Thanksgiving Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Happy Thanksgiving Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Happy Thanksgiving Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Fall Fox Plex Pre-roll (1).mp4;/storage/5BC3-F5E6/Prerroll/Happy Thanksgiving Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex McDonalds Preroll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Hulu Originals_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/Piracy. It's a crime. Universal Pre-roll_1080_H264;/storage/5BC3-F5E6/Prerroll/Retro CBS Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Laser Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Monkey Island Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Vibrant Plex Pre-Roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Piracy. It's a crime. Universal Pre-roll_1080_H264;/storage/5BC3-F5E6/Prerroll/Old Theater Film Intro Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Developer Coding Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4",
  },
  {
    startMonth: 12,
    startDay: 1,
    endMonth: 12,
    endDay: 25,
    list: "/storage/5BC3-F5E6/Prerroll/Christmas Ornaments Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Christmas Train Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Christmas Tree Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Colorful Lights Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Christmas Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Gingerbread Men Dance Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Merry Christmas Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Santa Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Tree Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Holiday Sweater Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Magic Christmas Tree Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Melting Snow Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Merry Christmas Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Magic Snow_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Santa Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowflakes Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowman Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Forest LoFi Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Ice Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter is Coming Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Snow Plex Pre-roll_1440_H264.mp4;/storage/5BC3-F5E6/Prerroll/Christmas Ornaments Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Christmas Train Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Christmas Tree Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Colorful Lights Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Christmas Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Gingerbread Men Dance Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Merry Christmas Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Santa Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Glitter Tree Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Holiday Sweater Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Magic Christmas Tree Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Melting Snow Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Merry Christmas Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Magic Snow_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Santa Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowflakes Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Snowman Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Forest LoFi Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Ice Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter is Coming Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Winter Snow Plex Pre-roll_1440_H264.mp4;/storage/5BC3-F5E6/Prerroll/Old Theater Film Intro Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/21st Century Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Shape Filling Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro CBS Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Studios_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Modern Plex Pre-roll.mp4",
  },
];

const DEFAULT_LIST =
  "/storage/5BC3-F5E6/Prerroll/21st Century Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Cartoon Ink Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/COVID-19 Google Stay the Fuck Home Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Developer Coding Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Disney Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/DVD Feature Presentation Universal Pre-roll_480_H264.mp4;/storage/5BC3-F5E6/Prerroll/Elegant Short Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Green Energy Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/HBO Static Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Laser Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Liquid Glitch Plex Pre-roll_2160_H264.mp4;/storage/5BC3-F5E6/Prerroll/Marvel V2 Shortened Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Modern Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Monkey Island Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Old Theater Film Intro Plex Pre-roll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Outrun Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Piracy. It's a crime. Universal Pre-roll_1080_H264;/storage/5BC3-F5E6/Prerroll/Plex Hulu Originals_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex McDonalds Preroll_720_H264.mp4;/storage/5BC3-F5E6/Prerroll/Plex Studios_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro CBS Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Retro VHS Plex Pre-roll.mp4;/storage/5BC3-F5E6/Prerroll/Shape Filling Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/THX Deep Note.mp4;/storage/5BC3-F5E6/Prerroll/TV Glitch Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Uber VHS Style Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Up Movie Plex Pre-roll_1080_H264.mp4;/storage/5BC3-F5E6/Prerroll/Vibrant Plex Pre-Roll_1080_H264.mp4";

const isBetweenDates = (preRollObject) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDay();
  const isJanuary = now.getMonth() === 0;
  const startYear =
    preRollObject.startMonth < preRollObject.endMonth
      ? currentYear - (isJanuary ? 1 : 0)
      : currentYear;
  const endYear =
    preRollObject.startMonth < preRollObject.endMonth
      ? currentYear + (!isJanuary ? 1 : 0)
      : currentYear;

  var from = new Date(
    startYear,
    preRollObject.startMonth - 1,
    preRollObject.startDay
  ); // -1 because months are from 0 to 11
  var to = new Date(endYear, preRollObject.endMonth - 1, preRollObject.endDay);
  var check = new Date(currentYear, currentMonth, currentDay);

  return check > from && check < to;
};

const BASE_URLS = {
  PLEX: "https://192-168-50-117.f87b00f414364572a60b2476835b44de.plex.direct:32400/:/prefs",
};

const options = {
  method: "PUT",
  headers: {},
};

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
  const requestUrl = new URL(BASE_URLS.PLEX);

  var search_params = requestUrl.searchParams;

  let currentListString = DEFAULT_LIST;
  const currentList = PREROLL_STRINGS.filter((prs) => isBetweenDates(prs))[0];
  if (currentList) currentListString = currentList.list;

  // new value of "id" is set to "101"
  search_params.set("X-Plex-Token", "jrs5sGHTx3z84GiDXDVM");
  search_params.set("CinemaTrailersPrerollID", currentListString);

  search_params.set("X-Plex-Product", "Plex Web");
  search_params.set("X-Plex-Version", "4.93.3");
  search_params.set("X-Plex-Client-Identifier", "m6s57jz3zuc7r8c9cb1oj00a");
  search_params.set("X-Plex-Platform", "Chrome");
  search_params.set("X-Plex-Platform-Version", "107.0");
  search_params.set(
    "X-Plex-Features",
    "external-media,indirect-media,hub-style-list"
  );
  search_params.set("X-Plex-Model", "hosted");
  search_params.set("X-Plex-Device", "OSX");
  search_params.set("X-Plex-Device-Name", "Chrome");
  search_params.set("X-Plex-Device-Screen-Resolution", "1708x911,2056x1329");
  search_params.set("X-Plex-Language", "en");

  // change the search property of the main url
  requestUrl.search = search_params.toString();

  // the new url string
  var finalUrl = requestUrl.toString();

  await getJSON(finalUrl);

  return JSON.stringify({ success: true });
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
