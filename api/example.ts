import * as base from './_lib/base';

export default async (req: CustomRequest, res: CustomResponse) => {
  base.setCorsHeadersAndSkipOptionsReq(req, res);

  const name = 'Test';
  const { age = 12 } = req.body || {};

  res.status(200).send({ message: `Hello ${name} of age ${age}!` });
};
