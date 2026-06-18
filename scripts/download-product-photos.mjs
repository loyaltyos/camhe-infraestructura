import fs from "node:fs";
import path from "node:path";

const apiUrl = "https://api.openverse.org/v1/images/";
const outDir = path.join("public", "products", "infraestructura");
const manifestPath = path.join(outDir, "manifest.json");
const userAgent = "CAMHEInfraestructura/1.0 (real product photo catalog)";

const queryByName = {
  "Banca urbana metálica": ["metal park bench", "park bench"],
  "Banca urbana de concreto": ["concrete bench park", "concrete bench"],
  "Banca con respaldo de acero": ["metal bench backrest", "park bench"],
  "Mesa urbana para parque": ["park picnic table", "picnic table park"],
  "Bicicletero metálico": ["bicycle rack street", "bike rack"],
  "Parabús urbano": ["bus shelter", "bus stop shelter"],
  "Pérgola metálica urbana": ["pergola park", "metal pergola"],
  "Cesto urbano metálico": ["street trash bin", "public trash bin"],
  "Bolardo fijo metálico": ["street bollards", "metal bollard"],
  "Bolardo abatible": ["removable bollard", "bollard street"],
  "Tope vehicular de caucho": ["rubber speed bump", "parking wheel stop"],
  "Tope vehicular metálico": ["speed bump road", "parking wheel stop"],
  "Defensa metálica vial": ["road guardrail", "metal guardrail"],
  "Barrera de protección": ["traffic barrier", "road safety barrier"],
  "Delimitador vial": ["traffic delineator", "road delineator"],
  "Trafitambo vial": ["traffic barrel", "construction barrel"],
  "Señal restrictiva alto": ["stop sign road", "stop sign"],
  "Señal preventiva curva": ["curve warning sign", "road warning sign"],
  "Señal informativa urbana": ["road information sign", "urban sign"],
  "Poste para señal vial": ["traffic sign post", "road sign pole"],
  "Señalética industrial": ["industrial safety sign", "factory safety sign"],
  "Señalamiento reflejante": ["reflective traffic sign", "road sign"],
  "Placa de nomenclatura urbana": ["street name sign", "street sign"],
  "Señal de límite de velocidad": ["speed limit sign", "road speed limit sign"],
  "Rejilla pluvial de acero": ["storm drain grate", "drain grate"],
  "Rejilla pluvial de hierro fundido": ["cast iron drain grate", "storm drain grate"],
  "Coladera pluvial": ["storm drain inlet", "street drain"],
  "Tapa de registro": ["manhole cover", "utility cover"],
  "Canal pluvial prefabricado": ["concrete drainage channel", "drainage channel"],
  "Brocal con tapa": ["manhole cover frame", "manhole cover"],
  "Registro sanitario prefabricado": ["sewer manhole", "concrete manhole"],
  "Rejilla para banqueta": ["sidewalk drain grate", "street drain grate"],
  "Juego infantil modular": ["playground equipment", "children playground"],
  "Columpio urbano": ["playground swing", "swing set park"],
  "Resbaladilla para parque": ["playground slide", "park slide"],
  "Gimnasio urbano básico": ["outdoor fitness equipment", "outdoor gym park"],
  "Gimnasio urbano multifuncional": ["outdoor gym equipment", "park exercise equipment"],
  "Contenedor urbano metálico": ["metal waste container", "dumpster"],
  "Contenedor para residuos": ["garbage container", "waste container street"],
  "Bebedero urbano": ["public drinking fountain", "drinking fountain"],
  "Mesa de picnic urbana": ["picnic table park", "park picnic table"],
  "Aparcabicicletas urbano": ["bike parking rack", "bicycle parking"],
  "Caseta de vigilancia": ["guard booth", "security booth"],
  "Caseta prefabricada": ["prefabricated cabin", "portable building"],
  "Módulo sanitario": ["public restroom building", "restroom building"],
  "Caseta para obra": ["construction site office", "portable site office"],
  "Módulo de control de acceso": ["security gate booth", "access control booth"],
  "Kiosco urbano": ["street kiosk", "urban kiosk"],
  "Módulo comercial prefabricado": ["modular shop", "kiosk building"],
  "Cabina de seguridad": ["security cabin", "guard cabin"]
};

const negativeTitlePattern =
  /logo|diagram|drawing|illustration|cartoon|map|plan|poster|signage template|screenshot|scan|painting|artwork/i;

const slug = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const productsFile = fs.readFileSync("lib/products.ts", "utf8");
const products = [...productsFile.matchAll(/\{ name: "([^"]+)", category: "([^"]+)"/g)].map((match) => ({
  name: match[1],
  category: match[2]
}));

async function searchOpenverse(query) {
  const params = new URLSearchParams({
    q: query,
    license_type: "commercial",
    extension: "jpg",
    page_size: "20"
  });

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(`${apiUrl}?${params}`);
    if (response.ok) {
      const data = await response.json();
      return (data.results ?? []).filter((item) => item.url && !negativeTitlePattern.test(item.title ?? ""));
    }
    if (response.status === 403 || response.status === 429 || response.status >= 500) {
      await sleep(6000 + attempt * 5000);
      continue;
    }
    return [];
  }

  return [];
}

async function download(url, destination) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(url, { redirect: "follow", headers: { "User-Agent": userAgent } });
    if (response.ok && (response.headers.get("content-type") ?? "").includes("image/")) {
      fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
      return response.url;
    }
    await sleep(1500 + attempt * 1500);
  }
  throw new Error(`Could not download image ${url}`);
}

async function downloadFallbackPhoto(product, destination, index) {
  const query = (queryByName[product.name]?.[0] ?? product.name).replaceAll(" ", ",");
  const url = `https://loremflickr.com/1000/750/${query}/all?lock=${53000 + index}`;
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok || !(response.headers.get("content-type") ?? "").includes("image/")) {
    throw new Error(`Fallback photo failed for ${product.name}: ${response.status}`);
  }
  fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
  return {
    title: product.name,
    creator: "Flickr via LoremFlickr",
    license: "source dependent",
    source: "loremflickr",
    foreign_landing_url: url
  };
}

fs.mkdirSync(outDir, { recursive: true });

const existingManifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : [];
const usedUrls = new Set(existingManifest.map((item) => item.imageUrl).filter(Boolean));
const manifest = [...existingManifest];

for (const product of products) {
  const fileName = `${slug(product.name)}.jpg`;
  const destination = path.join(outDir, fileName);
  if (fs.existsSync(destination) && manifest.some((item) => item.product === product.name)) {
    console.log(`${product.name} -> exists`);
    continue;
  }
  const queries = queryByName[product.name] ?? [product.name];
  let selected;
  let resolvedUrl;

  for (const query of queries) {
    const results = await searchOpenverse(query);
    for (const result of results) {
      if (usedUrls.has(result.url)) continue;
      try {
        resolvedUrl = await download(result.url, destination);
        selected = result;
        usedUrls.add(result.url);
        break;
      } catch {
        await sleep(500);
      }
    }
    if (selected) break;
  }

  if (!selected) {
    selected = await downloadFallbackPhoto(product, destination, products.indexOf(product));
    usedUrls.add(selected.foreign_landing_url);
  }

  manifest.push({
    product: product.name,
    category: product.category,
    file: `/products/infraestructura/${fileName}`,
    title: selected.title,
    creator: selected.creator,
    license: selected.license,
    source: selected.source,
    sourceUrl: selected.foreign_landing_url,
    imageUrl: resolvedUrl
  });

  console.log(`${product.name} -> ${fileName} (${selected.source}: ${selected.title})`);
  await sleep(900);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
