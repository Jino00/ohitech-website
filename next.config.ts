import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/insights/esc",            destination: "/insights/semiconductor-parts/esc",            permanent: true },
      { source: "/insights/wafer-carrier",  destination: "/insights/semiconductor-parts/wafer-carrier",  permanent: true },
      { source: "/insights/dry-vacuum-pump",destination: "/insights/semiconductor-parts/dry-vacuum-pump",permanent: true },
      { source: "/insights/oring",          destination: "/insights/semiconductor-parts/oring",          permanent: true },
      { source: "/insights/waterjet-laser", destination: "/insights/laser-equipment/waterjet-laser",     permanent: true },
    ];
  },
};

export default nextConfig;
