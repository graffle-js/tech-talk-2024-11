declare global {
  namespace _SushiGlobal {
    interface Registry {
      extension1: {
        mixin: {
          extension1Method: () => void
        }
      }
    }
  }
}
