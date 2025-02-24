export default function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === "/map") {
    return new Response(null, {
      headers: { Location: "/map.html" },
      status: 301,
    });
  }

  return new Response();
}
