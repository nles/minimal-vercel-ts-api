if (!process.eventNames().includes('unhandledRejection')) {
  process.on(
    'unhandledRejection' as any,
    async (err: Error, promise: any): Promise<void> => {
      console.log('unhandledRejection', err);
    },
  );
}

if (!process.eventNames().includes('uncaughtException')) {
  process.on(
    'uncaughtException',
    async (err: Error): Promise<void> => {
      console.log('uncaughtException', err);
    },
  );
}

export const defaultOriginsToAllow = ['https://my.production.url.tld'];

export const setCorsHeadersAndSkipOptionsReq = (req: CustomRequest, res: CustomResponse, originWhitelist: string[] = []) => {
  // figure out request origin
  const origins = req.headers.origin;
  const origin = typeof origins === 'object' ? origins[0] : origins;
  // allow direct whitelist match
  let originToAllow = '';
  const isWhitelisted = [ ...defaultOriginsToAllow, ...originWhitelist ].indexOf(origin || '') !== -1;
  if (isWhitelisted) originToAllow = origin || '';
  // allow if no origin is set (serverside calls)
  if (!origin) originToAllow = '*';
  // allow all origins in dev
  if (process.env.NODE_ENV === 'development') originToAllow = '*';
  // set cors headers
  res.setHeader('Access-Control-Allow-Origin', originToAllow);
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    [
      'Origin',
      'Accept',
      'Authorization',
      'Content-Type',
      'Content-Length',
    ].join(', '),
  );
  // don't continue further with OPTIONS request (just respond with 200)
  if (req.method === 'OPTIONS') {
    if (res.send) res.send(200);
    return false;
  }
  return true;
};
