import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // lucide-react 버전 문제 해결을 위한 설정
    // 명시적으로 0.479.0 버전을 사용하도록 리졸브 경로 설정
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["lucide-react"] = path.resolve(
      __dirname,
      "node_modules/lucide-react",
    );

    // 필요시 로깅
    if (dev && isServer) {
      if (config.optimization && config.optimization.splitChunks) {
        const originalSplitChunks = config.optimization.splitChunks;

        if (
          originalSplitChunks.cacheGroups &&
          originalSplitChunks.cacheGroups.vendor &&
          typeof originalSplitChunks.cacheGroups.vendor.name === "function"
        ) {
          originalSplitChunks.cacheGroups.vendor.reuseExistingChunk = false;

          const originalNameFunction =
            originalSplitChunks.cacheGroups.vendor.name;

          originalSplitChunks.cacheGroups.vendor.test =
            /[\\/]node_modules[\\/]/;
          originalSplitChunks.cacheGroups.vendor.minSize = undefined;
          originalSplitChunks.cacheGroups.vendor.minChunks = undefined;

          originalSplitChunks.cacheGroups.vendor.name = (module) => {
            const moduleId = module.nameForCondition();

            if (moduleId.includes("lucide")) {
              console.log(
                "DEBUG_💥[227]: next.config.ts:28: moduleId=",
                moduleId,
              );
            }

            // 원본 함수 호출하여 결과 확인
            const result = originalNameFunction(module);

            return result;
          };
        }
      }
    }

    return config;
  },
};

export default nextConfig;
