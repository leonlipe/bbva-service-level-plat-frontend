import {createFgaFrontExpressApp, IndexHandler} from '@gcp/fga-front-expressjs';
import * as path from 'path';
import * as express from 'express';

const publicPath = path.resolve('./public');

const app = createFgaFrontExpressApp({publicFolderPath: publicPath});

app.get('/', IndexHandler);
app.use(express.static(publicPath));
app.get('/*', IndexHandler);

export {app};
