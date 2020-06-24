import * as base from './_lib/base';

export default async (req: CustomRequest, res: CustomResponse) => {
  if (!base.setCorsHeadersAndSkipOptionsReq(req, res)) return;

  const { name = 'World' } = req.query

  res.setHeader('Cache-Control', 'no-cache');

  res.status(200).send(`Hello ${name}!`)
}
