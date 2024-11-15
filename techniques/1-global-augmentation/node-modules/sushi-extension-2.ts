declare global {
  namespace _SushiGlobal {
    interface Registry {
      extension2: {
        mixin: {
          extension2Method: () => void
        }
      }
    }
  }
}
