import { NowRequest, NowResponse } from '@now/node';

declare global {
  interface CustomRequest extends NowRequest {
    CUSTOM: {
      myCustomRequestParameter?: string;
    };
  }
  interface CustomResponse extends NowResponse {}
}
