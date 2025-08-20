import { useState } from "react";
type Options<Data, Param> = {
  manual: boolean; // 是否手动调用
  defaultParms: Param; // 默认参数
  onBefore: (param: Param) => void; // 回调之前
  onSuccess: (data: Data, param: Param) => void; // 调用成功
  onError: (e: Error, param: Param) => void; // 回调失败
  onFinally: (param: Param, data?: Data, e?: Error) => void; // 最终回调成功
  retryCount?: number; // 重试次数
  retryInterval?: number; // 重试间隔（毫秒）
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRequest = <Data, Param extends Array<any>>(
  req: (...args: Param) => Promise<Data>,
  options?: Partial<Options<Data, Param>>
) => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(false);

  const runWithRetry = async (
    args: Param,
    retryCount: number
  ): Promise<Data> => {
    try {
      const res = await req(...args);
      setData(res);
      options?.onSuccess?.(res, args);
      options?.onFinally?.(args, res, undefined);
      return res;
    } catch (e) {
      if (retryCount > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, options?.retryInterval ?? 1000)
        );
        return runWithRetry(args, retryCount - 1);
      } else {
        options?.onError?.(e as Error, args);
        options?.onFinally?.(args, undefined, e as Error);
        throw e;
      }
    }
  };

  const run: typeof req = (...args: Param) => {
    return new Promise((resolve, reject) => {
      options?.onBefore?.(args);
      setLoading(true);

      runWithRetry(args, options?.retryCount ?? 0)
        .then((res) => {
          setLoading(false);
          resolve(res);
        })
        .catch((e) => {
          setLoading(false);
          reject(e);
        });
    });
  };

  if (!(options?.manual ?? false)) {
    run(...((options?.defaultParms ?? []) as Param));
  }

  return {
    data,
    loading,
    run,
  };
};
