// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { existsSync, mkdir, readFileSync, writeFile } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { dirname, join } from "path";
import {
  getAlphanumeric,
  getGfycatUrl,
  getZws,
} from "../../components/urlGenerator";

type UrlType = "Alphanumeric" | "Gfycat" | "ZWS" | "Custom";

type UrlRequest = {
  sourceUrl: string;
  urlType: UrlType;
  customUrl: string;
};

export type UrlResponse = {
  url: string;
  message: string;
};

type StoredURL = {
  shortenedUrl: string;
  originalUrl: string;
};

type Store = {
  urls: Array<StoredURL>;
};

const storePath = join(process.cwd(), "private", "store.json");
export const store: Store = initializeStore();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UrlResponse>
) {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ message: "Only POST requests are allowed.", url: "" });
    return;
  }

  var urlReq: UrlRequest;

  try {
    urlReq = JSON.parse(req.body);
  }
  catch {
    urlReq = req.body as UrlRequest;
  }

  var url: string = generateUrl(urlReq.urlType);

  if (urlReq.urlType === "Custom" && urlReq.customUrl === "") {
    res
      .status(400)
      .json({ message: "Custom URL cannot be empty.", url: "" });
    return;
  }

  if (url == "") {
    url = urlReq.customUrl;
  }

  // Continue generating URLs until we find one that doesn't exist.
  // Collissions should be very very rare, but still...
  if (urlReq.urlType === "Custom") {
    if (anyUrls(url!)) {
      res.status(400).json({ message: "URL already exists.", url: "" });
      return;
    }
  } else {
    while (anyUrls(url!)) {
      url = generateUrl(urlReq.urlType);
    }
  }

  res.status(200).json({ message: "Successfully shortened URL.", url: url });

  store?.urls.push({
    shortenedUrl: url!,
    originalUrl: urlReq.sourceUrl,
  });

  writeStore();
}

function anyUrls(url: string) {
  return store?.urls.some((storedUrl) => storedUrl.shortenedUrl === url);
}

function generateUrl(type: UrlType) {
  switch (type) {
    case "Alphanumeric":
      return getAlphanumeric();

    case "Gfycat":
      return getGfycatUrl();

    case "ZWS":
      return getZws();

    case "Custom":
      return "";
  }
}

function initializeStore() {
  mkdir(dirname(storePath), () => {});

  if (!existsSync(storePath)) {
    return { urls: [] };
  } else {
    const storeFile = readFileSync(storePath);
    return JSON.parse(storeFile.toString());
  }
}

function writeStore() {
  writeFile(storePath, JSON.stringify(store), () => {});
}
