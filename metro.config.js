const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // Remove svg from assetExts
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    // Add svg to sourceExts
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

const mergedConfig = mergeConfig(defaultConfig, config);

module.exports = withNativeWind(mergedConfig, { input: './global.css' });