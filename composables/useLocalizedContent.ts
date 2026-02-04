// composables/useLocalizedContent.ts
// Helper to get locale-aware content paths

export const useLocalizedContent = () => {
  const { locale } = useI18n()

  /**
   * Returns the content path suffix based on current locale
   * - Default locale (pt-BR): no suffix
   * - English (en): '.en' suffix
   */
  const getLocaleSuffix = () => {
    return locale.value === 'en' ? '.en' : ''
  }

  /**
   * Returns the full content path for a data file
   * @param basePath - The base path without locale suffix (e.g., '/data/personal')
   */
  const getDataPath = (basePath: string) => {
    return `${basePath}${getLocaleSuffix()}`
  }

  /**
   * Fetches localized content with fallback to default locale
   * @param basePath - The base path without locale suffix
   * @param key - Unique key for useAsyncData caching
   */
  const fetchLocalizedData = async <T>(basePath: string, key: string) => {
    const localizedPath = getDataPath(basePath)

    return useAsyncData(`${key}-${locale.value}`, async () => {
      try {
        // Try to fetch localized content first
        const content = await queryContent<T>(localizedPath).findOne()
        return content
      } catch {
        // Fallback to default locale content if localized doesn't exist
        const fallbackContent = await queryContent<T>(basePath).findOne()
        return fallbackContent
      }
    })
  }

  return {
    locale,
    getLocaleSuffix,
    getDataPath,
    fetchLocalizedData,
  }
}
