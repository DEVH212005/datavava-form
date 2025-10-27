export interface DeepMergeOptions {
  /** Whether arrays should be merged (true) or replaced (false, default). */
  mergeArrays?: boolean;
  /** Log or handle merge errors. */
  onError?: (error: unknown, key?: string) => void;
}

export function deepMerge<T extends object, U extends object>(
  source: T,
  target: U,
  options: DeepMergeOptions = {}
): T & U {
  const { mergeArrays = false, onError } = options;
  const output = { ...source } as any;

  if (isObject(source) && isObject(target)) {
    Object.keys(target).forEach((key) => {
      try {
        const srcVal = (source as any)[key];
        const tgtVal = (target as any)[key];

        // --- Handle arrays ---
        if (Array.isArray(srcVal) && Array.isArray(tgtVal)) {
          if (!mergeArrays) {
            output[key] = tgtVal;
          } else {
            const maxLength = Math.max(srcVal.length, tgtVal.length);
            output[key] = new Array(maxLength);

            for (let index = 0; index < maxLength; index++) {
              const elementSource = srcVal[index];
              const elementTarget = tgtVal[index];

              if (isObject(elementSource) && isObject(elementTarget)) {
                output[key][index] = deepMerge(elementSource, elementTarget, {
                  mergeArrays: true,
                  onError,
                });
              } else {
                output[key][index] = elementSource;
              }
            }
          }

          // --- Handle nested objects ---
        } else if (isObject(srcVal) && isObject(tgtVal)) {
          output[key] = deepMerge(srcVal, tgtVal, options);

          // --- Handle primitives or mismatched types ---
        } else {
          output[key] = tgtVal;
        }
      } catch (err) {
        if (onError) onError(err, key);
        else console.warn(`⚠️ Failed to merge key "${key}":`, err);
      }
    });
  }

  return output as T & U;
}

// helper
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === "object" && !Array.isArray(item);
}
