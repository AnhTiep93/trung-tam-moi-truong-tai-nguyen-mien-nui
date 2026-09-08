import { useLocale } from "next-intl";
import { serviceGroupLabels, getLabel } from "@/lib/labels";
import type { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  const locale = useLocale();

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <span className="inline-block rounded-full bg-secondary-500/10 px-3 py-1 text-xs font-semibold text-secondary-600">
        {getLabel(serviceGroupLabels, service.group, locale)}
      </span>
      <h3 className="mt-3 font-semibold text-neutral-900">{service.name}</h3>
      {service.summary ? (
        <p className="mt-2 text-sm text-neutral-600">{service.summary}</p>
      ) : null}
    </div>
  );
}
