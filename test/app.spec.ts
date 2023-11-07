import {app} from '../src/app';
// eslint-disable-next-line node/no-unpublished-import
import * as supertest from 'supertest';

import {getSession} from '@gcp/fga/build/src/session';

jest.mock('@gcp/fga/build/src/session', () => ({
  ...jest.requireActual('@gcp/fga/build/src/session'),
  getSession: jest.fn(),
}));

describe('app.ts', () => {
  test('app created must be defined', async () => {
    // eslint-disable-next-line
    // @ts-ignore
    getSession.mockReturnValue({});

    const request = supertest(app);
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
