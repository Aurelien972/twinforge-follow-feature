/**
 * Debug Flags Configuration
 * Controls debug features across the application
 */

export const DEBUG_FLAGS = {
  avatar: {
    showBones: false,
    showMesh: true,
    showLights: false,
    enablePostProcessing: true,
  },
  performance: {
    monitorFPS: false,
    logRenderTime: false,
  },
  general: {
    verboseLogging: false,
  },
  // Face clipping debug flags
  DISABLE_FACE_CLIPPING: false,
  SHOW_FULL_BODY_IN_FACE_MODE: false,
  FORCE_MESH_VISIBLE: false,
} as const;

export type DebugFlags = typeof DEBUG_FLAGS;
