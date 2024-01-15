export const pipe = <FirstFn extends AnyFunc, F extends AnyFunc[]>(
  arg: Parameters<FirstFn>[0],
  firstFn: FirstFn,
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): LastFnReturnType<F, ReturnType<FirstFn>> =>
  (fns as AnyFunc[]).reduce((acc, fn) => fn(acc), firstFn(arg))
