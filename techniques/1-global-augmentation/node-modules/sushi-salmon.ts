declare global {
  namespace _SushiGlobal {
    interface Registry {
      salmon: {
        mixin: {
          salmon: () => void
        }
      }
    }
  }
}
