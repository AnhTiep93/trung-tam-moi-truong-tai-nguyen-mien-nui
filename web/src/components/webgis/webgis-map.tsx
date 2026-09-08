"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  NavigationControl,
  type MapOptions,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLocale, useTranslations } from "next-intl";
import type { GisLayer } from "@/lib/types";
import { gisLayerCategoryLabels, getLabel } from "@/lib/labels";

const OSM_STYLE: MapOptions["style"] = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

const DEFAULT_CENTER: [number, number] = [105.84, 21.59];
const DEFAULT_ZOOM = 9.5;

function sourceId(layerId: number) {
  return `gis-source-${layerId}`;
}

function fillLayerId(layerId: number) {
  return `gis-fill-${layerId}`;
}

function lineLayerId(layerId: number) {
  return `gis-line-${layerId}`;
}

function circleLayerId(layerId: number) {
  return `gis-circle-${layerId}`;
}

export function WebGisMap({ layers }: { layers: GisLayer[] }) {
  const t = useTranslations("webgis");
  const locale = useLocale();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [visible, setVisible] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(layers.map((l) => [l.id, l.defaultVisible]))
  );

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new MapLibreMap({
      container: mapContainer.current,
      style: OSM_STYLE,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.addControl(new NavigationControl(), "top-right");

    map.on("load", () => {
      for (const layer of layers) {
        map.addSource(sourceId(layer.id), {
          type: "geojson",
          data: layer.geojson,
        });

        map.addLayer({
          id: fillLayerId(layer.id),
          type: "fill",
          source: sourceId(layer.id),
          filter: ["==", ["geometry-type"], "Polygon"],
          paint: {
            "fill-color": layer.color,
            "fill-opacity": layer.fillOpacity,
          },
          layout: {
            visibility: layer.defaultVisible ? "visible" : "none",
          },
        });

        map.addLayer({
          id: lineLayerId(layer.id),
          type: "line",
          source: sourceId(layer.id),
          paint: {
            "line-color": layer.color,
            "line-width": 1.5,
          },
          layout: {
            visibility: layer.defaultVisible ? "visible" : "none",
          },
        });

        map.addLayer({
          id: circleLayerId(layer.id),
          type: "circle",
          source: sourceId(layer.id),
          filter: ["==", ["geometry-type"], "Point"],
          paint: {
            "circle-color": layer.color,
            "circle-radius": 5,
          },
          layout: {
            visibility: layer.defaultVisible ? "visible" : "none",
          },
        });
      }
      setMapReady(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleLayer(layerId: number) {
    const map = mapRef.current;
    if (!map) return;

    const nextVisible = !visible[layerId];
    setVisible((prev) => ({ ...prev, [layerId]: nextVisible }));

    const visibility = nextVisible ? "visible" : "none";
    for (const id of [
      fillLayerId(layerId),
      lineLayerId(layerId),
      circleLayerId(layerId),
    ]) {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, "visibility", visibility);
      }
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="order-2 rounded-lg border border-neutral-200 bg-white p-4 lg:order-1">
        <h3 className="text-sm font-semibold text-neutral-900">
          {t("layersTitle")} / {t("legend")}
        </h3>
        <ul className="mt-3 space-y-2">
          {layers.map((layer) => (
            <li key={layer.id}>
              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={visible[layer.id] ?? false}
                  onChange={() => toggleLayer(layer.id)}
                  className="mt-0.5"
                />
                <span
                  className="mt-0.5 h-3 w-3 shrink-0 rounded-sm border border-black/10"
                  style={{ backgroundColor: layer.color }}
                  aria-hidden="true"
                />
                <span>
                  <span className="block font-medium text-neutral-800">
                    {layer.name}
                  </span>
                  <span className="block text-xs text-neutral-500">
                    {getLabel(gisLayerCategoryLabels, layer.category, locale)}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-1 lg:order-2">
        <div
          ref={mapContainer}
          className="h-[480px] w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 sm:h-[560px]"
        />
        {!mapReady ? (
          <p className="mt-2 text-sm text-neutral-500">{t("loading")}</p>
        ) : null}
      </div>
    </div>
  );
}
