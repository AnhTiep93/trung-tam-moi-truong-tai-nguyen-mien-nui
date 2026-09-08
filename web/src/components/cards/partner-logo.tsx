import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { Partner } from "@/lib/types";

export function PartnerLogo({ partner }: { partner: Partner }) {
  const logoUrl = getStrapiMediaUrl(partner.logo);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white p-4 text-center">
      <div className="relative flex h-16 w-full items-center justify-center">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={partner.name}
            fill
            sizes="160px"
            className="object-contain"
          />
        ) : (
          <span className="text-sm font-semibold text-neutral-400">
            {partner.name.charAt(0)}
          </span>
        )}
      </div>
      <p className="text-xs text-neutral-600">{partner.name}</p>
    </div>
  );
}
