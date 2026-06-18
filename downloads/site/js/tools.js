(function () {
  var DOWNLOADS = "https://downloads.empwns.uk";

  var tools = [
    {
      id: "shone-box",
      file: "shone-box/ShoneBox-Setup.exe",
      manifest: "shone-box/manifest.json"
    },
    {
      id: "empwns-rte",
      file: "empwns-rte/EmpwnsRTE-Setup.exe",
      manifest: "empwns-rte/manifest.json"
    },
    {
      id: "xex-toolkit",
      file: "xex-toolkit/XEXToolkit.zip",
      manifest: "xex-toolkit/manifest.json"
    },
    {
      id: "shone-os",
      file: "shone-os/ShoneOS.iso",
      manifest: "shone-os/manifest.json"
    }
  ];

  function el(id) { return document.getElementById(id); }

  function setStatus(id, text, kind) {
    var s = el(id + "-status");
    if (!s) return;
    s.textContent = text;
    s.className = "status" + (kind ? " " + kind : "");
  }

  function setVersion(id, ver) {
    var v = el(id + "-version");
    if (v && ver) v.textContent = "v" + ver;
  }

  function setDownload(id, url) {
    var btn = el(id + "-download");
    if (btn) btn.href = url;
  }

  function checkTool(tool) {
    var fileUrl = DOWNLOADS + "/" + tool.file;
    var manifestUrl = DOWNLOADS + "/" + tool.manifest;

    setStatus(tool.id, "Checking...", "");

    fetch(manifestUrl + "?cb=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (data) {
        setVersion(tool.id, data.version || "");
        setDownload(tool.id, data.url || fileUrl);
        return fetch(data.url || fileUrl, { method: "HEAD", cache: "no-store" });
      })
      .then(function (r) {
        setStatus(tool.id, r.ok ? "Ready to download" : "File not uploaded yet", r.ok ? "ok" : "warn");
      })
      .catch(function () {
        fetch(fileUrl, { method: "HEAD", cache: "no-store" })
          .then(function (r) {
            setDownload(tool.id, fileUrl);
            setStatus(tool.id, r.ok ? "Ready to download" : "Not published yet", r.ok ? "ok" : "warn");
          })
          .catch(function () {
            setStatus(tool.id, "Unavailable", "err");
          });
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    tools.forEach(checkTool);
  });
})();
