(() => {
  const routeSuffixes = [
    "work/social-work-practices/", "people/apei-song/", "work/policy-briefs/",
    "work/articles/", "work/monographs/", "work/projects/", "work/reports/",
    "logo-story/", "resources/", "events/", "work/"
  ];
  const current = location.pathname.endsWith("/") ? location.pathname : location.pathname.replace(/[^/]+$/, "");
  const suffix = routeSuffixes.find((item) => current.endsWith(item));
  const base = suffix ? current.slice(0, -suffix.length) : current;
  const routeMap = {
    "/": "index.html", "/work": "work/", "/work/articles": "work/articles/",
    "/work/monographs": "work/monographs/", "/work/policy-briefs": "work/policy-briefs/",
    "/work/projects": "work/projects/", "/work/reports": "work/reports/",
    "/work/social-work-practices": "work/social-work-practices/", "/events": "events/",
    "/logo-story": "logo-story/", "/people/apei-song": "people/apei-song/",
    "/resources": "resources/"
  };
  const repair = () => document.querySelectorAll('a[href^="/"]').forEach((link) => {
    const url = new URL(link.getAttribute("href"), location.origin);
    const target = routeMap[url.pathname];
    if (target) link.setAttribute("href", base + target + url.hash);
  });
  repair();
  new MutationObserver(repair).observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:["href"]});
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || link.target) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname.startsWith(base) && url.pathname !== location.pathname) {
      event.preventDefault(); event.stopImmediatePropagation(); location.assign(url.href);
    }
  }, true);
})();
