import { NextRequest, NextResponse } from "next/server";
import { CustomUrl } from "./api/get-url";

const blacklist = ["/", "/api/get-url", "/api/create-url"];
const websiteUrl = "http://localhost:3006";

const Middleware = async (req: NextRequest) => {
  if (!process.browser) {
    return NextResponse.next();
  }

  if (blacklist.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  var res = await fetch(websiteUrl + "/api/get-url", {
    body: JSON.stringify({
      shortened: req.nextUrl.pathname.substring(1),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (res.status == 404) {
    return NextResponse.next();
  }

  var custom: CustomUrl;
  var txt = await res.text();

  try {
      custom = JSON.parse(txt);
      return NextResponse.redirect(custom.url);
  }
  catch {
      console.log(txt);
      return NextResponse.next();
  }
};

export default Middleware;
