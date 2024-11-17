declare global {
  namespace _SushiGlobal {
    interface Registry {
      tuna: {
        mixin: {
          tuna: () => void
        }
      }
    }
  }
}
