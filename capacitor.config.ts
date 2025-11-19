
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cannonball.game',
  appName: 'Cannonball!',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
