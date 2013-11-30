/**
 * Used by sub-generators
 *
 * - automatically sets `this.env.options.coffee` for all sub-generators
 *   based on whether .coffee files are present in app
 * - sets `this.appPath` based on the path of the current working directory
 * - adds `generateSourceAndTest` method to all sub-generators that inherit
 *   from this class
 * - addScriptsToIndex would allow to browser-test-setup and perhaps other places
 *   where dependencies are being required
 */

// Leaving as a TODO until the 2nd generator makes the abstraction more clear