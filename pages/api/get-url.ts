// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { existsSync, mkdir, readFileSync, writeFile } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { store } from "./create-url";

export type CustomUrl = {
  url: string;
};

export type FullUrlRequest = {
  shortened: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomUrl>
) {
  if (req.method !== "POST") {
    res.status(404).json({ url: "" });
    return;
  }

  var urlReq: FullUrlRequest;

  try {
    urlReq = JSON.parse(req.body);
  } catch {
    urlReq = req.body as FullUrlRequest;
  }

  const short = urlReq.shortened;

  if (store.urls.some((url) => url.shortenedUrl === short)) {
    res.status(200).json({ url: store.urls.find((url) => url.shortenedUrl === short)!.originalUrl });
    return;
  }

  // I mean, it's *teeeechnically* a 404.
  res.status(404).json({ url: "" });
}
