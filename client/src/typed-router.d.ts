/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'home': RouteRecordInfo<'home', '/', Record<never, never>, Record<never, never>>,
    'user_messages': RouteRecordInfo<'user_messages', '/:user_id', { user_id: ParamValue<true> }, { user_id: ParamValue<false> }>,
    'not_found': RouteRecordInfo<'not_found', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    'signin': RouteRecordInfo<'signin', '/signin', Record<never, never>, Record<never, never>>,
    'signup': RouteRecordInfo<'signup', '/signup', Record<never, never>, Record<never, never>>,
  }
}
