type ExecuteRes = {
  output?: {
    str: string;
    arr: number[];
  };
  error?: string;
};

type ReqType = {
  code: string;
  input?: string | number[];
};
