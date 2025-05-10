/**
 * Error with stream solved in https://github.com/supabase/supabase-js/issues/1400
 * 
 * The package at "node_modules\ws\lib\stream.js" attempted to import the Node standard library module "stream". 
 * It failed because the native React runtime does not include the Node standard library.
 * 
 */

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

module.exports = config;