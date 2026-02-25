(function () {
  function safeJsonParse(text) {
    try {
      return { ok: true, data: JSON.parse(text) };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch " + url + " (" + response.status + ")");
    }
    return response.json();
  }

  function downloadJson(filename, data) {
    const serialized = JSON.stringify(data, null, 2);
    const href = "data:text/json;charset=utf-8," + encodeURIComponent(serialized);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  function bindJsonImport(fileInputElement, onData) {
    fileInputElement.addEventListener("change", function () {
      if (!fileInputElement.files || !fileInputElement.files[0]) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (event) {
        const parsed = safeJsonParse(String(event.target.result || ""));
        if (!parsed.ok) {
          alert("Invalid JSON file.");
          return;
        }
        onData(parsed.data);
      };
      reader.readAsText(fileInputElement.files[0]);
      fileInputElement.value = "";
    });
  }

  function nearestTerrainHeight(terrainMap, x, z, fallbackY) {
    if (!Array.isArray(terrainMap) || terrainMap.length === 0) {
      return fallbackY;
    }
    let best = terrainMap[0];
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < terrainMap.length; i += 1) {
      const p = terrainMap[i];
      const dx = p.x - x;
      const dz = p.z - z;
      const dist = dx * dx + dz * dz;
      if (dist < bestDist) {
        best = p;
        bestDist = dist;
      }
    }
    return typeof best.y === "number" ? best.y : fallbackY;
  }

  function mapToStorageKey(kind) {
    return kind === "path" ? "oneocean_demo_path_v1" : "oneocean_demo_map_v1";
  }

  function cacheData(kind, data) {
    const key = mapToStorageKey(kind);
    localStorage.setItem(key, JSON.stringify(data));
  }

  function readCachedData(kind) {
    const key = mapToStorageKey(kind);
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const parsed = safeJsonParse(raw);
    return parsed.ok ? parsed.data : null;
  }

  window.OceanDemoShared = {
    fetchJson,
    downloadJson,
    bindJsonImport,
    nearestTerrainHeight,
    cacheData,
    readCachedData,
  };
})();
