/*
 * Copyright (c) 2019 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Distribution License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/org/documents/edl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */

const baseConfig = require('@eclipse-scout/cli/scripts/webpack-defaults');
module.exports = (env, args) => {
  args.resDirArray = [
    'src/main/resources/WebContent',
    'node_modules/@eclipse-scout/core/res',
    'node_modules/@eclipse-scout/demo-widgets-heatmap/node_modules/leaflet/dist/leaflet.css'
  ];
  const config = baseConfig(env, args);

  config.entry = {
    'widgets': './src/main/js/index.js',
    'login': './src/main/js/login.js',
    'logout': './src/main/js/logout.js',
    'widgets-theme': './src/main/js/theme.less',
    'widgets-theme-dark': './src/main/js/theme-dark.less'
  };

  // chunk definition for chart.js dependency
  config.optimization.splitChunks.cacheGroups.chartJs = {
    test: /[\\/]node_modules[\\/]chart.js[\\/]|[\\/]node_modules[\\/]moment[\\/]/,
    name: 'chartjs',
    priority: -2,
    reuseExistingChunk: true
  };

  // chunk definition for leaflet.js dependency
  config.optimization.splitChunks.cacheGroups.leaflet = {
    test: /[\\/]node_modules[\\/]leaflet[\\/]/,
    name: 'leaflet',
    priority: -2,
    reuseExistingChunk: true
  };

  return config;
};
