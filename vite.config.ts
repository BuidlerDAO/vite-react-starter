import { ConfigEnv, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import baseConfig, { projectBasePath } from './src/configs/base';
import { viteMockServe } from 'vite-plugin-mock';
import { viteVConsole } from 'vite-plugin-vconsole';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/styles/reset.scss";@import "@/styles/variables.scss";`
        }
      }
    },
    base:
      mode === 'prod'
        ? `${baseConfig.cdn.host}${projectBasePath}`
        : mode === 'test'
        ? baseConfig.publicPath + '/'
        : mode === 'grey'
        ? baseConfig.publicPath + '/'
        : './',
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'mocks',
        supportTs: true,
        localEnabled: command === 'serve' && mode === 'mock',
        prodEnabled: false
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        // injectCode: `
        //   import { setupProdMockServer } from './mockProdServer';
        //   setupProdMockServer();
        // `
      }),
      viteVConsole({
        entry: resolve(__dirname, './src/main.tsx'),
        localEnabled: true,
        enabled:
          command !== 'serve' &&
          (mode === 'test' || mode === 'test1' || mode === 'alpha'),
        config: {
          maxLogNumber: 1000,
          theme: 'light'
        }
      }),
      eslintPlugin()
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target:
            mode === 'alpha'
              ? 'http://alpha-api.vadxq.com'
              : mode === 'test'
              ? 'http://test-api.vadxq.com'
              : mode === 'grey'
              ? 'https://api.vadxq.com'
              : mode === 'prod'
              ? 'https://api.vadxq.com'
              : 'http://0.0.0.0:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/ohter-api': {
          target: 'http://other-api.vadxq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ohter-api/, '')
        }
      }
    },
    build: {
      target: 'es2015',
      outDir: './dist/',
      cssCodeSplit: true,
      polyfillModulePreload: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          }
        }
      }
    }
  };
};
